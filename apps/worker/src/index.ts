// src/index.ts - worker 入口

import { handleGetStatus } from './api/status';
import { handleGetWeather } from './api/weather';
import { handleGetCampuses } from './api/campuses';
import { handleGetHistory } from './api/history';
import { handleClassic } from './api/classic';
import { handleApiCatalog } from './api/api-catalog';
import { handleAgentSkills } from './api/agent-skills';
import { handleOAuthDiscovery } from './api/oauth-discovery';
import { handleOAuthProtectedResource } from './api/oauth-protected-resource';
import { handleMcpServerCard } from './api/mcp-server-card';
import { addLinkHeaders } from './api/link-headers';
import { handleScheduled } from './tasks/producer';
import { handleQueue } from './tasks/consumer';
import { Env, QueueMessage } from './types/env';
import { CAMPUS_LIST } from './config';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const NO_CACHE_HEADERS: Record<string, string> = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

function isCampusId(value: string): boolean {
  return (CAMPUS_LIST as readonly string[]).includes(value);
}

function withCors(
  response: Response,
  extraHeaders?: Record<string, string>,
): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    headers.set(k, v);
  }
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) {
      headers.set(k, v);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function errorResponse(message: string, status: number): Response {
  return new Response(message, {
    status,
    headers: CORS_HEADERS,
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      const url = new URL(request.url);

      if (url.pathname === '/api/campuses') {
        return withCors(handleGetCampuses(), NO_CACHE_HEADERS);
      }

      if (url.pathname.startsWith('/api/get_status/')) {
        const campusId = url.pathname.split('/').pop() || '';
        if (!isCampusId(campusId)) {
          return errorResponse('Invalid campus', 400);
        }
        return withCors(await handleGetStatus(request, env), NO_CACHE_HEADERS);
      }

      if (url.pathname.startsWith('/api/weather/')) {
        const campusId = url.pathname.split('/').pop() || '';
        if (!isCampusId(campusId)) {
          return errorResponse('Invalid campus', 400);
        }
        return withCors(await handleGetWeather(request, env), NO_CACHE_HEADERS);
      }

      if (url.pathname.startsWith('/api/history/')) {
        const campusId = url.pathname.split('/').pop() || '';
        if (!isCampusId(campusId)) {
          return errorResponse('Invalid campus', 400);
        }
        return withCors(await handleGetHistory(request, env), NO_CACHE_HEADERS);
      }

      if (url.pathname === '/classic' || url.pathname === '/classic/') {
        return await handleClassic(env);
      }

      if (url.pathname === '/.well-known/api-catalog') {
        return withCors(handleApiCatalog());
      }

      if (url.pathname === '/.well-known/agent-skills/index.json') {
        return withCors(handleAgentSkills());
      }

      if (url.pathname === '/.well-known/openid-configuration') {
        return withCors(handleOAuthDiscovery());
      }

      if (url.pathname === '/.well-known/oauth-authorization-server') {
        return withCors(handleOAuthDiscovery());
      }

      if (url.pathname === '/.well-known/oauth-protected-resource') {
        return withCors(handleOAuthProtectedResource());
      }

      if (url.pathname === '/.well-known/mcp/server-card.json') {
        return withCors(handleMcpServerCard());
      }

      // 非 API/classic 路由 → 交给静态资产系统处理（包括 _redirects 和 SPA 回退）
      const assetResponse = await env.ASSETS.fetch(request);
      const contentType = assetResponse.headers.get('Content-Type') || '';

      // 非 HTML 资源（图片、SVG 等）直接透传，不破坏二进制内容
      if (!contentType.includes('text/html')) {
        return withCors(assetResponse);
      }

      // HTML 资源：添加 Link headers
      return withCors(addLinkHeaders(assetResponse, url.pathname));
    } catch (e) {
      console.error('Unhandled error:', e);
      return errorResponse('Internal Server Error', 500);
    }
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduled(env));
  },

  async queue(
    batch: MessageBatch<QueueMessage>,
    env: Env,
    ctx: ExecutionContext,
  ) {
    await handleQueue(batch, env, ctx);
  },
};
