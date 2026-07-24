// src/api/weather.ts - /weather/:campus 校区天气查询 API

import { Env } from '../types/env';
import { getCampusWeather } from '../storage/kv';

export async function handleGetWeather(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const campusId = url.pathname.split('/').pop() || '';

  const weather = await getCampusWeather(env, campusId);
  if (!weather) {
    return new Response('Not Found', { status: 404 });
  }

  return Response.json(weather);
}
