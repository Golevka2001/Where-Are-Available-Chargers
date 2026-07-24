// 插座状态类型：0-占用, 1-空闲, 2-故障
export type SocketStatus = 0 | 1 | 2;

// 充电桩状态类型，表示带有 10 个插座的设备
export interface ChargerStatus {
  name: string;
  description: string | null | undefined;
  fault_info: string | null | undefined;
  total_count: number;
  available_count: number;
  sockets: SocketStatus[];
}

// 充电站状态类型，是按地点划分的充电桩集合
export interface StationStatus {
  name: string;
  description: string | null | undefined;
  total_count: number;
  available_count: number;
  lat: number | null;
  lng: number | null;
  addr: string | null;
  chargers: ChargerStatus[];
}

// 整体状态详情类型
export interface StatusDetail {
  total_count: number;
  available_count: number;
  stations: StationStatus[];
}

// 最终状态响应类型
export interface StatusResponse {
  code: number;
  last_update_time: number;
  fault_info?: string;
  status: StatusDetail;
}

/**
 * 中网充
 */

// 插座状态类型
export interface ZWCSocketStatus {
  devNum: number; // 编号，1-10
  // devType: number;
  normal: number; // 0-空闲, 1-使用中, 其他-当做故障
  // protocol: number;
}

// 充电桩状态类型
export interface ZWCChargerStatus {
  address: string;
  // agentId: number;
  // devType: number;
  // lastVisitedTime: number;
  name: string;
  normal: number; // 1-正常
  // ownerId: number;
  // pid: number;
  positionId: number;
  positionX: number;
  positionY: number;
  productList: ZWCSocketStatus[];
  // protocol: number;
  sn: string;
}

// 中网充接口响应类型
export interface ZWCResponse {
  gpsRedisArrayList: ZWCChargerStatus[];
  // locale: string;
  // msg: string | null;
  // normal: number;
  // texts: string | null;
  time: number; // 时间戳，单位：秒
}
