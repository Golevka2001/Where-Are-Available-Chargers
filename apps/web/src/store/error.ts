// 错误页面参数传递

import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    errorFrom: '',
    stationName: '',
  }),
});
