export enum socket_status {
  busy,
  free,
  fault,
}

// 注意转译后和原始不同，API 返回的原始代码是
// 1: '使用中',
// 2: "故障",
// 3: "故障",
// 5: "故障",
// 0: '空闲'

export type T_socket = {
  status: socket_status;
  end_timestamp: number | null;
};

export type T_base_info = {
  raw_name?: null | string;
  ck: string;
  name?: string | null;
  sn?: string | number | null;
  gpsId?: string | number | null;
  devType?: string | number | null;
  pid?: number | string;
};

export type T_charger = {
  ck: string;
  pid?: number | string;
  raw_name: string | null;
  name?: string | null;
  fault_info: string | number | null;
  available_count: number;
  sockets: Array<T_socket>;
};

export type T_station = {
  name: string;
  description?: string;
  location_lat?: number;
  location_lon?: number;
  available_count: number;
  total_count: number;
  chargers: Array<T_charger>;
};

export enum tip_kind {
  tip,
  warning,
  // 没想好
}

export type T_tip = {
  kind: tip_kind;
  title: string;
  body?: string | null;
};

export type T_result = {
  code: number;
  tips?: Array<T_tip>;
  last_update_time: number;
  status: Array<T_station>;
  fault_info?: string | number;
  available_count: number;
  total_count: number;
};

export type T_station_c = {
  name: string;
  description?: string | null;
  chargers: Array<T_base_info>;
  location_lat?: number | null;
  location_lon?: number | null;
};
