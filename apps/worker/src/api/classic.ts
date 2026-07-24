// src/api/classic.ts - SSR 经典视图

import { Env } from '../types/env';
import { CAMPUS_LIST, CAMPUS_CONFIG, CampusId } from '../config';
import { getCampusStatus } from '../storage/kv';
import { StatusResponse, ChargerStatus } from '../types';

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

function socketBar(chargers: ChargerStatus[]): string {
  const parts: string[] = [];
  for (const c of chargers) {
    if (c.available_count > 0) {
      const num = c.name.replace(/.*?(\d+)#?/, '$1');
      const ratio = c.available_count / 10;
      const color = ratio > 0.25 ? '#28a745' : '#e67e22';
      parts.push(
        `#${num}:<span style="color:${color}">${c.available_count}</span>`,
      );
    }
  }
  return parts.length > 0 ? parts.join(',  ') : '无';
}

function renderHtml(
  campusData: Record<CampusId, StatusResponse | null>,
  lastUpdateTime: number,
  mainSiteUrl: string,
): string {
  const timeStr = lastUpdateTime > 0 ? formatTime(lastUpdateTime) : '暂无数据';

  let campusSections = '';

  for (const campusId of CAMPUS_LIST) {
    const config = CAMPUS_CONFIG[campusId];
    const data = campusData[campusId];
    const stations = data?.status?.stations ?? [];

    let rows = '';
    for (const s of stations) {
      const ratio = s.total_count > 0 ? s.available_count / s.total_count : 0;
      const color =
        s.available_count === 0 ? '#999' : ratio > 0.25 ? '#28a745' : '#e67e22';
      const countText = `<span style="color:${color};font-weight:bold">${s.available_count}</span> / ${s.total_count}`;

      rows += `
        <tr>
          <th>${s.name}</th>
          <td>${countText}</td>
          <td style="font-size:0.85em;text-align:left">${socketBar(s.chargers)}</td>
        </tr>`;
    }

    campusSections += `
      <h3 align="center">${config.name}</h3>
      <table>
        <colgroup>
          <col style="width:30%">
          <col style="width:20%">
          <col style="width:50%">
        </colgroup>
        <tr>
          <th>充电站</th>
          <th>空闲 / 总计</th>
          <th>桩号余量</th>
        </tr>
        ${rows}
      </table>`;
  }

  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=3" />
  <title>Where Are Available Chargers?!</title>
  <style>
    @media (max-width:768px) { html { font-size:55%; } }
    table, th, td { border:0.1em solid #000; }
    table { border-collapse:collapse; width:90%; margin:auto; }
    th, td { text-align:center; vertical-align:middle; padding:0.3em 0.5em; }
    td { word-wrap:break-word; overflow-wrap:break-word; white-space:normal; }
    th { font-weight:bolder; }
    .text { max-width:80%; margin:auto; }
  </style>
</head>
<body>
  <h1 align="center">Where Are Available Chargers?!</h1>
  <p align="center"><a href="${mainSiteUrl}">访问主站</a></p>

  <br /><hr /><br />

  <h2 align="center">查询结果</h2>
  <p align="center">
    数据获取时间：${timeStr}
  </p>

  ${campusSections}

  <br /><hr /><br />

  <p align="center">
    Copyright &copy; Gol3vka &amp; Csimide
  </p>
</body>
</html>`;
}

export async function handleClassic(env: Env): Promise<Response> {
  const campusData = {} as Record<CampusId, StatusResponse | null>;
  let lastUpdateTime = 0;

  for (const campusId of CAMPUS_LIST) {
    const data = await getCampusStatus(env, campusId);
    campusData[campusId] = data;
    if (data && data.last_update_time > lastUpdateTime) {
      lastUpdateTime = data.last_update_time;
    }
  }

  const html = renderHtml(campusData, lastUpdateTime, env.MAIN_SITE_URL || '/');

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
