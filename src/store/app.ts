// 组件状态管理

import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerOpen: false,
    isFooterVisible: true,
  }),
  actions: {},
});
