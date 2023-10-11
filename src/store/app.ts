import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    // 组件状态管理
    isDrawerOpen: false,
    isFooterVisible: true,

    // 数据状态管理
    statusManager: new StatusManager(),
  }),
});
