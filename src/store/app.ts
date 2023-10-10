import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerOpen: false,
    isFooterVisible: true,
    statusManager: new StatusManager(),
    config: {
      latestMapPath: '/img/map-20230919.webp',
      stationThresholdPercentage: 0.25, // TODO: 改判定方式
      dataExpirationTime: 1 * 60 * 1000, // 提示数据过期时间
      bottomBarShowDelay: 1.5 * 1000, // 底栏隐藏后再次显示的延迟时间
    },
  }),
});
