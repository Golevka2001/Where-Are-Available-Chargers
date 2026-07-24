// src/tasks/providers/zwc.ts - 中网充，九龙湖、四牌楼、丁家桥充电服务提供商

import {
  ZWCResponse,
  ZWCChargerStatus,
  ZWCSocketStatus,
  SocketStatus,
  ChargerStatus,
  StationStatus,
  StatusDetail,
} from '../../types';
import { CampusId, CAMPUS_LIST } from '../../config';
import chargerData from '../../data/chargers.json';

interface StationMapEntry {
  name: string;
  station: { name: string };
  campusId: CampusId;
}

type ChargerInfo = { name: string; station: string };
type ChargerData = {
  chargers: Record<string, ChargerInfo>;
  stations: Record<string, Record<string, never>>;
};
type ChargerMap = Record<CampusId, ChargerData>;

const map = chargerData as ChargerMap;

function buildSNMap(): Record<string, StationMapEntry> {
  const result: Record<string, StationMapEntry> = {};

  for (const campusId of CAMPUS_LIST) {
    const data = map[campusId];
    for (const [sn, info] of Object.entries(data.chargers)) {
      result[sn] = {
        name: info.name,
        station: { name: info.station },
        campusId,
      };
    }
  }

  return result;
}

let _snMap: Record<string, StationMapEntry> | null = null;

function getSNMap(): Record<string, StationMapEntry> {
  if (_snMap) return _snMap;
  _snMap = buildSNMap();
  return _snMap;
}

function mapSocketStatus(normal: number): SocketStatus {
  if (normal === 0) return 1; // ZWC 0-空闲 → 前端 1-空闲
  if (normal === 1) return 0; // ZWC 1-使用中 → 前端 0-占用
  return 2; // 故障
}

function normalizeSockets(sockets: ZWCSocketStatus[]): SocketStatus[] {
  return sockets
    .slice()
    .sort((a, b) => a.devNum - b.devNum)
    .map((socket) => mapSocketStatus(socket.normal));
}

function buildChargerStatus(
  charger: ZWCChargerStatus,
  entry: StationMapEntry | undefined,
): ChargerStatus {
  const sockets = normalizeSockets(charger.productList ?? []);
  const availableCount = sockets.filter((s) => s === 1).length;

  return {
    name: entry?.name ?? charger.name,
    description: null,
    fault_info: charger.normal === 1 ? null : 'device_abnormal',
    total_count: sockets.length,
    available_count: availableCount,
    sockets,
  };
}

function transformStatus(
  chargers: ZWCChargerStatus[],
  campusId?: CampusId,
): StatusDetail {
  const snMap = getSNMap();
  const stationIndex = new Map<string, StationStatus>();

  for (const charger of chargers) {
    const entry = snMap[charger.sn];
    if (campusId && entry?.campusId !== campusId) continue;
    if (!entry) continue;

    const stationKey = entry.station.name;

    let stationStatus = stationIndex.get(stationKey);
    if (!stationStatus) {
      stationStatus = {
        name: entry.station.name,
        description: null,
        total_count: 0,
        available_count: 0,
        lat: charger.positionY ?? null,
        lng: charger.positionX ?? null,
        addr: charger.address ?? null,
        chargers: [],
      };
      stationIndex.set(stationKey, stationStatus);
    }

    const chargerStatus = buildChargerStatus(charger, entry);
    stationStatus.chargers.push(chargerStatus);
    stationStatus.total_count += chargerStatus.total_count;
    stationStatus.available_count += chargerStatus.available_count;
  }

  const stations = Array.from(stationIndex.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const total_count = stations.reduce((sum, s) => sum + s.total_count, 0);
  const available_count = stations.reduce(
    (sum, s) => sum + s.available_count,
    0,
  );

  return { total_count, available_count, stations };
}

export async function fetchAllByCampus(
  apiUrl: string,
  localDev?: string,
  cfAccessClientId?: string,
  cfAccessClientSecret?: string,
): Promise<Record<CampusId, StatusDetail>> {
  let chargers: ZWCChargerStatus[];

  if (localDev === 'true') {
    const { getMockZWCResponse } = await import('../../mocks/chargers');
    const mock = getMockZWCResponse();
    chargers = mock.gpsRedisArrayList || [];
  } else {
    const headers: Record<string, string> = {};
    if (cfAccessClientId && cfAccessClientSecret) {
      headers['CF-Access-Client-Id'] = cfAccessClientId;
      headers['CF-Access-Client-Secret'] = cfAccessClientSecret;
    }
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`ZWC API request failed: ${response.status}`);
    }
    const data: ZWCResponse = await response.json();
    chargers = data.gpsRedisArrayList || [];
  }

  return {
    jiulonghu: transformStatus(chargers, 'jiulonghu'),
    sipailou: transformStatus(chargers, 'sipailou'),
    dingjiaqiao: transformStatus(chargers, 'dingjiaqiao'),
  };
}
