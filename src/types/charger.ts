// 充电桩状态相关类型定义

export type SocketStatus = 0 | 1 | 2;

export interface ChargerStatus {
  name: string;
  description: string | null | undefined;
  fault_info: string | null | undefined;
  total_count: number;
  available_count: number;
  sockets: SocketStatus[];
}

export interface StationStatus {
  name: string;
  description: string | null | undefined;
  total_count: number;
  available_count: number;
  chargers: ChargerStatus[];
}

export interface StatusDetail {
  total_count: number;
  available_count: number;
  stations: StationStatus[];
}

export interface StatusResponse {
  code: number;
  last_update_time: number;
  status: StatusDetail;
}
