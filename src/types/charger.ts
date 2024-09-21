// 充电桩状态相关类型定义

export type SocketStatus = 0 | 1 | 2;

// 带剩余时间的插座状态（备用）
export interface SocketStatusWithEndTS {
  status: 0 | 1 | 2;
  end_timestamp: number | null | undefined;
}

export interface ChargerStatus {
  name: string;
  description: string | null | undefined;
  fault_info: string | null | undefined;
  total_count: number;
  available_count: number;
  sockets: Array<SocketStatus | SocketStatusWithEndTS>;
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
  fault_info?: string;
  status: StatusDetail;
}
