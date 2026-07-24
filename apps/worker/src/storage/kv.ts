// src/storage/kv.ts - KV 存储层

import { Env } from '../types/env';
import { StatusResponse } from '../types';
import { WeatherResponse } from '../services/weather/service';

const STATUS_KEY_PREFIX = 'status:';
const WEATHER_KEY_PREFIX = 'weather:';

export async function getCampusStatus(
  env: Env,
  campusId: string,
): Promise<StatusResponse | null> {
  const key = `${STATUS_KEY_PREFIX}${campusId}`;
  const data = await env.seu_chargers_kv.get(key, 'json');
  return data as StatusResponse | null;
}

export async function setCampusStatus(
  env: Env,
  campusId: string,
  data: StatusResponse,
): Promise<void> {
  const key = `${STATUS_KEY_PREFIX}${campusId}`;
  await env.seu_chargers_kv.put(key, JSON.stringify(data));
}

export async function getCampusWeather(
  env: Env,
  campusId: string,
): Promise<WeatherResponse | null> {
  const key = `${WEATHER_KEY_PREFIX}${campusId}`;
  const data = await env.seu_chargers_kv.get(key, 'json');
  return data as WeatherResponse | null;
}

export async function setCampusWeather(
  env: Env,
  campusId: string,
  data: WeatherResponse,
): Promise<void> {
  const key = `${WEATHER_KEY_PREFIX}${campusId}`;
  await env.seu_chargers_kv.put(key, JSON.stringify(data));
}
