// src/services/weather/service.ts - 天气服务（和风天气 QWeather）

import { Env } from '../../types/env';

interface QWeatherHourly {
  fxTime: string;
  temp: string;
  icon: string;
  text: string;
  windDir: string;
  windScale: string;
  humidity: string;
}

interface QWeatherResponse {
  code: string;
  updateTime: string;
  hourly: QWeatherHourly[];
}

export interface WeatherResponse {
  status: string;
  timestamp: number;
  hourly: {
    description: string;
    skycon: { datetime: string; value: string }[];
  };
}

// QWeather icon code → TIANQI skycon value
const ICON_MAP: Record<string, string> = {
  '100': 'CLEAR_DAY',
  '101': 'CLOUDY',
  '102': 'PARTLY_CLOUDY_DAY',
  '103': 'PARTLY_CLOUDY_DAY',
  '104': 'CLOUDY',
  '150': 'CLEAR_NIGHT',
  '151': 'CLOUDY',
  '153': 'PARTLY_CLOUDY_NIGHT',
  '154': 'PARTLY_CLOUDY_NIGHT',
  '300': 'LIGHT_RAIN',
  '301': 'MODERATE_RAIN',
  '302': 'HEAVY_RAIN',
  '303': 'STORM_RAIN',
  '304': 'STORM_RAIN',
  '305': 'LIGHT_RAIN',
  '306': 'MODERATE_RAIN',
  '307': 'HEAVY_RAIN',
  '308': 'HEAVY_RAIN',
  '309': 'LIGHT_RAIN',
  '310': 'MODERATE_RAIN',
  '311': 'HEAVY_RAIN',
  '312': 'HEAVY_RAIN',
  '313': 'HEAVY_RAIN',
  '314': 'MODERATE_RAIN',
  '315': 'HEAVY_RAIN',
  '316': 'STORM_RAIN',
  '317': 'STORM_RAIN',
  '318': 'STORM_RAIN',
  '399': 'LIGHT_RAIN',
  '400': 'LIGHT_SNOW',
  '401': 'MODERATE_SNOW',
  '402': 'HEAVY_SNOW',
  '403': 'HEAVY_SNOW',
  '404': 'LIGHT_SNOW',
  '405': 'MODERATE_SNOW',
  '406': 'HEAVY_SNOW',
  '407': 'LIGHT_SNOW',
  '408': 'MODERATE_SNOW',
  '409': 'MODERATE_SNOW',
  '410': 'HEAVY_SNOW',
  '499': 'LIGHT_SNOW',
  '500': 'FOG',
  '501': 'FOG',
  '502': 'MODERATE_HAZE',
  '503': 'DUST',
  '504': 'DUST',
  '507': 'DUST',
  '508': 'DUST',
  '509': 'MODERATE_HAZE',
  '510': 'MODERATE_HAZE',
  '511': 'HEAVY_HAZE',
  '512': 'HEAVY_HAZE',
  '513': 'HEAVY_HAZE',
  '514': 'LIGHT_HAZE',
  '515': 'LIGHT_HAZE',
  '900': 'WIND',
  '901': 'WIND',
};

function mapIcon(iconCode: string): string {
  return ICON_MAP[iconCode] || 'CLOUDY';
}

function getDescription(hourly: QWeatherHourly[]): string {
  if (hourly.length === 0) return '暂无天气数据';
  const texts = new Set(hourly.slice(0, 6).map((h) => h.text));
  return `未来6小时${[...texts].join('转')}`;
}

export class WeatherService {
  private apiUrl: string;
  private apiKey: string;

  constructor(env: Env) {
    this.apiUrl = env.WEATHER_API_URL;
    this.apiKey = env.WEATHER_API_KEY;
  }

  async getWeather(lat: number, lng: number): Promise<WeatherResponse> {
    const url = `${this.apiUrl}?location=${lng},${lat}&key=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }
    const data: QWeatherResponse = await response.json();

    if (data.code !== '200') {
      throw new Error(`Weather API error: ${data.code}`);
    }

    return {
      status: 'ok',
      timestamp: Math.floor(Date.now() / 1000),
      hourly: {
        description: getDescription(data.hourly),
        skycon: data.hourly.map((h) => ({
          datetime: h.fxTime,
          value: mapIcon(h.icon),
        })),
      },
    };
  }
}
