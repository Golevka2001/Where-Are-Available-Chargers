// src/tasks/charger.ts - 充电桩数据同步

import { Env } from '../types/env';
import { CAMPUS_LIST } from '../config';
import { fetchAllByCampus } from './providers/zwc';
import { setCampusStatus } from '../storage/kv';
import { StatusResponse } from '../types';

async function insertHistory(
  env: Env,
  campusId: string,
  total: number,
  available: number,
  fault: number,
  timestamp: number,
): Promise<void> {
  await env.seu_chargers_d1
    .prepare(
      'INSERT OR IGNORE INTO charging_status_history (campus_id, timestamp, total_count, available_count, fault_count, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    )
    .bind(
      campusId,
      timestamp,
      total,
      available,
      fault,
      Math.floor(Date.now() / 1000),
    )
    .run();
}

export async function syncChargerData(env: Env): Promise<void> {
  const apiUrl = env.ZWC_API_URL || '';
  if (!apiUrl) {
    console.warn('No ZWC API URL configured, skipping charger sync');
    return;
  }

  const results = await fetchAllByCampus(
    apiUrl,
    env.USE_MOCK,
    env.CF_ACCESS_CLIENT_ID,
    env.CF_ACCESS_CLIENT_SECRET,
  );
  const now = Date.now();

  for (const campusId of CAMPUS_LIST) {
    const statusDetail = results[campusId];
    const response: StatusResponse = {
      code: 200,
      last_update_time: now,
      status: statusDetail,
    };
    await setCampusStatus(env, campusId, response);

    const faultCount =
      statusDetail.total_count -
      statusDetail.available_count -
      statusDetail.stations.reduce(
        (sum, s) =>
          sum +
          s.chargers.reduce(
            (cSum, c) => cSum + c.sockets.filter((s) => s === 0).length,
            0,
          ),
        0,
      );

    await insertHistory(
      env,
      campusId,
      statusDetail.total_count,
      statusDetail.available_count,
      faultCount,
      now,
    );

    console.log(
      `[${campusId}] ${statusDetail.total_count} total, ${statusDetail.available_count} available, ${statusDetail.stations.length} stations`,
    );
  }
}
