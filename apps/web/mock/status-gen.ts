import type {
  ChargerStatus,
  SocketStatus,
  StationStatus,
  StatusDetail,
  StatusResponse,
} from '../src/types/charger';

const CHARGER_FAULT_RATE = 0.1;
const SOCKET_FAULT_RATE = 0.1;

// 真实站点数据（与后端 chargers.json 对齐）
const campusStations: Record<
  string,
  Record<string, { lat: number; lng: number; addr: string; chargers: number }>
> = {
  jiulonghu: {
    校医院: {
      lat: 31.892883,
      lng: 118.82438,
      addr: '江苏省南京市江宁区秣陵街道东南大学九龙湖校区校医院',
      chargers: 9,
    },
    北门东侧: {
      lat: 31.893595,
      lng: 118.8246,
      addr: '江苏省南京市江宁区秣陵街道南高北路东南大学(九龙湖校区)',
      chargers: 18,
    },
    北门西侧: {
      lat: 31.893429,
      lng: 118.82249,
      addr: '江苏省南京市江宁区秣陵街道南高北路东南大学(九龙湖校区)',
      chargers: 6,
    },
    橘园北侧: {
      lat: 31.885979,
      lng: 118.81205,
      addr: '江苏省南京市江宁区秣陵街道南高西路东南大学(九龙湖校区)',
      chargers: 15,
    },
    东门南侧: {
      lat: 31.886993,
      lng: 118.830055,
      addr: '江苏省南京市江宁区秣陵街道南工路东南大学(九龙湖校区)',
      chargers: 3,
    },
    南门外西侧: {
      lat: 31.880817,
      lng: 118.82094,
      addr: '江苏省南京市江宁区秣陵街道东南大学路东南大学(九龙湖校区)',
      chargers: 3,
    },
    南门外东侧: {
      lat: 31.881042,
      lng: 118.819916,
      addr: '江苏省南京市江宁区秣陵街道东南大学九龙湖校区(南门)',
      chargers: 2,
    },
    青教公寓: {
      lat: 31.893145,
      lng: 118.8271,
      addr: '江苏省南京市江宁区秣陵街道南高北路东南大学(九龙湖校区)',
      chargers: 10,
    },
    东门北侧: {
      lat: 31.887383,
      lng: 118.82984,
      addr: '江苏省南京市江宁区秣陵街道南高东路东南大学(九龙湖校区)',
      chargers: 25,
    },
    北门外卖柜旁: {
      lat: 31.887253,
      lng: 118.82091,
      addr: '江苏省南京市江宁区秣陵街道东南大学(九龙湖校区)',
      chargers: 2,
    },
  },
  dingjiaqiao: {
    基二教学楼: {
      lat: 32.080357,
      lng: 118.78186,
      addr: '江苏省南京市鼓楼区厚德路',
      chargers: 9,
    },
    羽毛球馆: {
      lat: 32.07484,
      lng: 118.77591,
      addr: '江苏省南京市鼓楼区中央门街道厚德路东南大学(丁家桥校区)',
      chargers: 1,
    },
    求恩2舍: {
      lat: 32.082733,
      lng: 118.78201,
      addr: '江苏省南京市鼓楼区新模范马路7号',
      chargers: 1,
    },
    留学生宿舍楼: {
      lat: 32.082382,
      lng: 118.78278,
      addr: '江苏省南京市鼓楼区丁家桥87号-29',
      chargers: 2,
    },
    求恩1舍: {
      lat: 32.082287,
      lng: 118.78217,
      addr: '江苏省南京市鼓楼区丁家桥87号-29',
      chargers: 4,
    },
    求恩5舍: {
      lat: 32.082615,
      lng: 118.78154,
      addr: '江苏省南京市鼓楼区新模范马路7号',
      chargers: 2,
    },
    基一教学楼: {
      lat: 32.07486,
      lng: 118.77603,
      addr: '江苏省南京市鼓楼区中央门街道东南大学(丁家桥校区)',
      chargers: 3,
    },
    公卫楼: {
      lat: 32.07486,
      lng: 118.77603,
      addr: '江苏省南京市鼓楼区中央门街道东南大学(丁家桥校区)',
      chargers: 2,
    },
  },
};

// 插座状态：0-占用, 1-空闲, 2-故障（与前端对齐）
const genSocketStatus = (): SocketStatus => {
  const r = Math.random();
  if (r < SOCKET_FAULT_RATE) return 2;
  if (r < 0.5) return 0; // 45% 占用
  return 1; // 45% 空闲
};

const genChargerStatus = (
  chargerName: string,
  socketCount: number,
): ChargerStatus => {
  const sockets = Array.from({ length: socketCount }, () => genSocketStatus());

  const chargerStatus: ChargerStatus = {
    name: chargerName,
    description: null,
    fault_info: null,
    total_count: socketCount,
    available_count: sockets.filter((s) => s === 1).length,
    sockets,
  };

  if (Math.random() < CHARGER_FAULT_RATE) {
    chargerStatus.fault_info = '未启用';
    chargerStatus.available_count = 0;
  }

  return chargerStatus;
};

const genStationStatus = (
  stationName: string,
  stationData: { lat: number; lng: number; addr: string; chargers: number },
): StationStatus => {
  const chargers = Array.from({ length: stationData.chargers }, (_, i) =>
    genChargerStatus(`${stationName}${i + 1}#`, 10),
  );

  return {
    name: stationName,
    description: null,
    total_count: chargers.reduce((sum, c) => sum + c.total_count, 0),
    available_count: chargers.reduce((sum, c) => sum + c.available_count, 0),
    lat: stationData.lat,
    lng: stationData.lng,
    addr: stationData.addr,
    chargers,
  };
};

const genStatusDetail = (
  stations: Record<
    string,
    { lat: number; lng: number; addr: string; chargers: number }
  >,
): StatusDetail => {
  const stationList = Object.entries(stations).map(([name, data]) =>
    genStationStatus(name, data),
  );

  return {
    total_count: stationList.reduce((sum, s) => sum + s.total_count, 0),
    available_count: stationList.reduce((sum, s) => sum + s.available_count, 0),
    stations: stationList,
  };
};

export const genRandomStatusData = (
  campusId: string = 'jiulonghu',
): StatusResponse => {
  const stations = campusStations[campusId] || campusStations.jiulonghu;

  return {
    code: 200,
    last_update_time: Date.now(),
    status: genStatusDetail(stations),
  };
};
