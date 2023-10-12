// 充电桩状态管理

import { defineStore } from 'pinia';
import { useAppStore } from './app';
import { StationStatus } from '@/types/station-status';
import { getChargersStatus } from '@/apis/chargers-status';

const appStore = useAppStore();

export const useStatusStore = defineStore('status', {
  state: () => ({
    lastUpdateTime: 0,
    statusDetail: {
      total_count: 0,
      available_count: 0,
      stations: [] as StationStatus[],
    },
    isFetchingData: false,
  }),
  actions: {
    async updateData(): Promise<void> {
      // TODO：处理异常情况
      if (this.isFetchingData) {
        return;
      }
      this.isFetchingData = true;
      appStore.bottomBarText = '正在更新数据，请稍候...';
      try {
        const response = await getChargersStatus();
        this.lastUpdateTime = response.last_update_time;
        this.statusDetail = response.status;
      } finally {
        this.isFetchingData = false;
        appStore.bottomBarText = null;
      }
    },
  },
});
