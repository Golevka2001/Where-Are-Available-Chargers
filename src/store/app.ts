import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerOpen: false,
    statusManager: new StatusManager(),
    config: {
      station_threshold_percentage: 0.25,
    },
  }),
});
