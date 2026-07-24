// src/api/status.ts - /get_status/:campus 校区充电桩状态查询 API

import { Env } from '../types/env';
import { getCampusStatus } from '../storage/kv';

export async function handleGetStatus(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const campusId = url.pathname.split('/').pop() || '';

  const snapshot = await getCampusStatus(env, campusId);

  if (!snapshot) {
    return new Response('Not Found', { status: 404 });
  }

  return Response.json(snapshot);
}
