// 天气数据管理

import { defineStore } from 'pinia';
import { SkyconIcon } from '@/types/weather';
import { getWeatherData } from '@/apis/weather';

import {
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiWeatherPartlyCloudy,
  mdiWeatherNightPartlyCloudy,
  mdiWeatherCloudy,
  mdiWeatherHazy,
  mdiWeatherRainy,
  mdiWeatherPouring,
  mdiWeatherFog,
  mdiWeatherSnowy,
  mdiWeatherSnowyHeavy,
  mdiWeatherDust,
  mdiWeatherWindy,
} from '@mdi/js';

// TODO：是否要按需引入？
const skycon2Icon = (skycon: string): string => {
  let icon: string;
  switch (skycon) {
    case 'CLEAR_DAY':
      icon = mdiWeatherSunny;
      break;
    case 'CLEAR_NIGHT':
      icon = mdiWeatherNight;
      break;
    case 'PARTLY_CLOUDY_DAY':
      icon = mdiWeatherPartlyCloudy;
      break;
    case 'PARTLY_CLOUDY_NIGHT':
      icon = mdiWeatherNightPartlyCloudy;
      break;
    case 'CLOUDY':
      icon = mdiWeatherCloudy;
      break;
    case 'LIGHT_HAZE':
    case 'MODERATE_HAZE':
    case 'HEAVY_HAZE':
      icon = mdiWeatherHazy;
      break;
    case 'LIGHT_RAIN':
    case 'MODERATE_RAIN':
      icon = mdiWeatherRainy;
      break;
    case 'HEAVY_RAIN':
    case 'STORM_RAIN':
      icon = mdiWeatherPouring;
      break;
    case 'FOG':
      icon = mdiWeatherFog;
      break;
    case 'LIGHT_SNOW':
    case 'MODERATE_SNOW':
      icon = mdiWeatherSnowy;
      break;
    case 'HEAVY_SNOW':
    case 'STORM_SNOW':
      icon = mdiWeatherSnowyHeavy;
      break;
    case 'DUST':
    case 'SAND':
      icon = mdiWeatherDust;
      break;
    case 'WIND':
      icon = mdiWeatherWindy;
      break;
    default:
      icon = mdiWeatherCloudy;
      break;
  }
  return icon;
};

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    forecast: '正在获取天气数据，请稍后...',
    skyconIconList: [] as SkyconIcon[],
  }),
  getters: {
    getSkyconIconList: (state) => {
      return (interval: number): SkyconIcon[] => {
        interval = Math.max(interval, 1);
        const skyconIconList: SkyconIcon[] = [];
        for (let i = 0; i < state.skyconIconList.length; i += interval) {
          skyconIconList.push(state.skyconIconList[i]);
        }
        return skyconIconList;
      };
    },
  },
  actions: {
    async updateData(): Promise<void> {
      try {
        const res = await getWeatherData();
        if (res.status !== 'ok') {
          throw new Error('返回的天气数据无效');
        }
        // 更新数据
        this.forecast = res.hourly.description;
        this.skyconIconList = res.hourly.skycon
          .sort((a, b) => a.datetime.localeCompare(b.datetime))
          .map((item) => ({
            time: item.datetime.slice(11, 16),
            icon: skycon2Icon(item.value),
          }));
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
});
