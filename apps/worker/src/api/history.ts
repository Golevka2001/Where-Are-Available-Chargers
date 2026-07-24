// src/api/history.ts - GET /api/history/:campusId 充电桩历史记录

import { Env } from '../types/env';

const RANGE_MAP: Record<string, number> = {
  '1h': 3600,
  '6h': 21600,
  '24h': 86400,
  '7d': 604800,
};

function isValidTimestamp(val: unknown): val is number {
  return typeof val === 'number' && isFinite(val) && val > 0;
}

export async function handleGetHistory(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const campusId = url.pathname.split('/').pop() || '';

  const startParam = url.searchParams.get('start');
  const endParam = url.searchParams.get('end');

  let startMs: number;
  let endMs: number;

  if (startParam && endParam) {
    const s = Number(startParam);
    const e = Number(endParam);
    if (!isValidTimestamp(s) || !isValidTimestamp(e) || s > e) {
      return Response.json(
        { code: 400, message: 'Invalid start/end parameters' },
        { status: 400 },
      );
    }
    startMs = s;
    endMs = e;
  } else {
    const range = url.searchParams.get('range') || '24h';
    const rangeSeconds = RANGE_MAP[range] || RANGE_MAP['24h'];
    endMs = Date.now();
    startMs = endMs - rangeSeconds * 1000;
  }

  // 限制最大时间范围为7天
  const maxRangeMs = 7 * 24 * 3600 * 1000;
  if (endMs - startMs > maxRangeMs) {
    startMs = endMs - maxRangeMs;
  }

  const { results } = await env.seu_chargers_d1
    .prepare(
      'SELECT timestamp, total_count, available_count, fault_count FROM charging_status_history WHERE campus_id = ? AND timestamp >= ? AND timestamp <= ? ORDER BY timestamp ASC',
    )
    .bind(campusId, startMs, endMs)
    .all();

  return Response.json({
    code: 200,
    campus_id: campusId,
    data: results,
  });
}
