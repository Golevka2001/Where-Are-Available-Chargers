// 充电桩状态管理

import { defineStore } from 'pinia';
import { StationStatus } from '@/types/station-status';
import { getChargersStatus } from '@/apis/chargers-status';

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
    async updateData(isRefresh: boolean = false): Promise<void> {
      // `isRefresh` 用于区分加载页面时的刷新和手动刷新
      // 加载 status 页面时会显示 loading 后再显示数据
      // 而手动刷新时大概率页面已经有了数据，不用显示 loading
      // TODO：处理异常情况
      if (this.isFetchingData) {
        return;
      }
      if (!isRefresh) {
        this.isFetchingData = true;
      }
      try {
        const response = await getChargersStatus();
        this.lastUpdateTime = response.last_update_time;
        this.statusDetail = response.status;
      } finally {
        if (!isRefresh) {
          this.isFetchingData = false;
        }
      }
    },
  },
});
