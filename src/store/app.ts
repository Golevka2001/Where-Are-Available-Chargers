import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerOpen: false,
    statusManager: new StatusManager(),
    config: {
      latestMapPath: '/img/map-20230919.webp',
      stationThresholdPercentage: 0.25,
    },
  }),
});
