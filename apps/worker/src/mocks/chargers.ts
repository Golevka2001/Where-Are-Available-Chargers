// src/mocks/chargers.ts - 基于真实 API 响应的 mock 数据

import { ZWCResponse } from '../types';
import exampleResponse from '../../specs/zwc-response-example.json';

function randomSocketStatus(): number {
  const r = Math.random();
  if (r < 0.5) return 0; // 50% 空闲
  if (r < 0.9) return 1; // 40% 使用中
  return 56; // 10% 故障
}

export function getMockZWCResponse(): ZWCResponse {
  const chargers = exampleResponse.gpsRedisArrayList.map((charger) => ({
    ...charger,
    productList: charger.productList.map((socket) => ({
      ...socket,
      normal: randomSocketStatus(),
    })),
  }));

  return {
    gpsRedisArrayList: chargers,
    time: Math.floor(Date.now() / 1000),
  };
}
