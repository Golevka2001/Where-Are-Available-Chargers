import type {
  ChargerStatus,
  SocketStatus,
  StationStatus,
  StatusDetail,
  StatusResponse,
} from '../src/types/charger';

const STATION_FILTER_RATE = 0.2;
const STATION_DESCRIPTION_RATE = 0.5;
const CHARGER_FAULT_RATE = 0.1;
const SOCKET_FAULT_RATE = 0.1;

const CHARGER_COUNT_BASE = 1;
const CHARGER_COUNT_RANGE = 5;

// const REQUEST_ERROR_RATE = 0.4;
const REQUEST_ERROR_RATE = 0;

const genStationNameList = (): string[] => {
  const stationNameList = [
    '东门北侧',
    '东门南侧',
    '西门北侧',
    '西门南侧',
    '南门西侧',
    '南门东侧',
    '北门东北侧',
    '北门东南侧',
  ];
  return stationNameList.filter(() => Math.random() > STATION_FILTER_RATE);
};

const genSocketStatus = (): SocketStatus => {
  if (Math.random() < SOCKET_FAULT_RATE) {
    return 2;
  } else {
    return Math.floor(Math.random() * 2) as SocketStatus;
  }
};

const genChargerStatus = (
  chargerName: string,
  socketCount: number,
): ChargerStatus => {
  const sockets = Array.from({ length: socketCount }, () => genSocketStatus());

  const chargerStatus: ChargerStatus = {
    available_count: sockets.filter((s) => s === 1).length,
    description: null,
    fault_info: null,
    name: chargerName,
    sockets,
    total_count: socketCount,
  };

  if (Math.random() < CHARGER_FAULT_RATE) {
    chargerStatus.fault_info = '未启用';
    chargerStatus.available_count = 0;
  } else {
    chargerStatus.fault_info = null;
  }

  return chargerStatus;
};

const genStationStatus = (
  stationName: string,
  chargerCount: number,
): StationStatus => {
  const chargers = Array.from({ length: chargerCount }, (_, i) => {
    const chargerName = String.fromCharCode(65 + i);
    const chargerStatus = genChargerStatus(chargerName, 10);
    return chargerStatus;
  });

  const stationStatus: StationStatus = {
    name: stationName,
    description:
      Math.random() < STATION_DESCRIPTION_RATE
        ? stationName + '充电站位于xxx'
        : null,
    total_count: chargers.reduce((sum, c) => sum + c.total_count, 0),
    available_count: chargers.reduce((sum, c) => sum + c.available_count, 0),
    chargers,
  };

  return stationStatus;
};

const genStatusDetail = (stationNameList: string[]): StatusDetail => {
  const stations = stationNameList.map((stationName) => {
    const chargerCount =
      Math.floor(Math.random() * CHARGER_COUNT_RANGE) + CHARGER_COUNT_BASE;
    const stationStatus = genStationStatus(stationName, chargerCount);
    return stationStatus;
  });

  const total_count = stations.reduce((sum, s) => sum + s.total_count, 0);
  const available_count = stations.reduce(
    (sum, s) => sum + s.available_count,
    0,
  );

  const statusDetail: StatusDetail = {
    total_count,
    available_count,
    stations,
  };

  return statusDetail;
};

export const genRandomStatusData = (): StatusResponse => {
  const stationNameList = genStationNameList();
  const statusDetail = genStatusDetail(stationNameList);

  const testData = {
    code: Math.random() < REQUEST_ERROR_RATE ? 0 : 200,
    last_update_time: Date.now(),
    status: statusDetail,
  };

  return testData;
};
