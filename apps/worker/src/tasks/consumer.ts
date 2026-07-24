// src/tasks/consumer.ts - 响应 queue，执行具体的同步逻辑

import { syncChargerData } from './charger';
import { syncWeatherData } from './weather';
import { Env, QueueMessage } from '../types/env';

export async function handleQueue(
  batch: MessageBatch<QueueMessage>,
  env: Env,
  _ctx: ExecutionContext,
) {
  for (const message of batch.messages) {
    const task = message.body;

    try {
      if (task.type === 'SYNC_CHARGER') {
        await syncChargerData(env);
      } else if (task.type === 'SYNC_WEATHER') {
        await syncWeatherData(env);
      }
    } catch (e) {
      console.error(`Task ${task.type} failed:`, e);
      throw e;
    }
  }
}
