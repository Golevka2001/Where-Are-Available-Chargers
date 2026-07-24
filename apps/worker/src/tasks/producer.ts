// src/tasks/producer.ts - 响应 cron，向 queue 发送消息

import { Env } from '../types/env';
import { syncChargerData } from './charger';
import { syncWeatherData } from './weather';

export async function handleScheduled(env: Env): Promise<void> {
  if (env.USE_MOCK === 'true') {
    await syncChargerData(env);
    await syncWeatherData(env);
    return;
  }

  await env.seu_chargers_queue.sendBatch([
    { body: { type: 'SYNC_CHARGER' } },
    { body: { type: 'SYNC_WEATHER' } },
  ]);
}
