// 天气数据相关类型定义

export interface RawSkycon {
  datetime: string;
  value: string;
}

export interface SkyconIcon {
  time: string;
  icon: string;
}

export interface WeatherResponse {
  status: string;
  timestamp: number;
  hourly: {
    description: string;
    skycon: RawSkycon[];
  };
}
