// src/types/env.ts - 环境变量、KV、Queue 等绑定

export interface Env {
  ASSETS: Fetcher;
  seu_chargers_kv: KVNamespace;
  seu_chargers_d1: D1Database;
  seu_chargers_queue: Queue<QueueMessage>;
  USE_MOCK: string;
  ZWC_API_URL: string;
  CF_ACCESS_CLIENT_ID: string;
  CF_ACCESS_CLIENT_SECRET: string;
  WEATHER_API_URL: string;
  WEATHER_API_KEY: string;
  MAIN_SITE_URL: string;
}

export type QueueMessage = { type: 'SYNC_CHARGER' } | { type: 'SYNC_WEATHER' };
