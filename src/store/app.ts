import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerOpen: false,
    statusManager: new StatusManager(),
  }),
});
