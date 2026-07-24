// src/config.ts - 校区配置

export const CAMPUS_LIST = ['jiulonghu', 'sipailou', 'dingjiaqiao'] as const;
export type CampusId = (typeof CAMPUS_LIST)[number];

export interface CampusConfig {
  id: CampusId;
  name: string;
  gps: { lat: number; lng: number };
}

// 以下坐标只用在天气服务
// 根据和风天气文档 https://dev.qweather.com/docs/api/weather/weather-daily-forecast/
// 经纬度最多支持小数点后 2 位，【不要改】
export const CAMPUS_CONFIG: Record<CampusId, CampusConfig> = {
  jiulonghu: {
    id: 'jiulonghu',
    name: '九龙湖',
    gps: { lat: 31.89, lng: 118.82 },
  },
  sipailou: {
    id: 'sipailou',
    name: '四牌楼',
    gps: { lat: 32.05, lng: 118.79 },
  },
  dingjiaqiao: {
    id: 'dingjiaqiao',
    name: '丁家桥',
    gps: { lat: 32.07, lng: 118.77 },
  },
};
