// 充电桩状态管理

import { defineStore } from 'pinia';
import { useAppStore } from './app';
import { StationStatus } from '@/types/charger';
import { getChargersStatus } from '@/apis/charger';
import { campusConfig } from '@/types/campus-config';
import router from '@/router';

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
    async updateData(campus: campusConfig): Promise<void> {
      // 防止重复请求
      if (this.isFetchingData) {
        return;
      }
      this.isFetchingData = true;
      appStore.bottomBarBgColor = 'success';
      appStore.bottomBarText = '正在更新数据，请稍候...';
      try {
        const res = await getChargersStatus(campus);
        if (res.code === 766) {
          await router.push({
            path: '/challenge',
            query: {
              callback: router.currentRoute.value.fullPath,
            },
          });
          appStore.bottomBarBgColor = 'error';
          appStore.bottomBarText = '数据更新失败，点此重试';
          this.isFetchingData = false;
          return;
        }
        if (res.code !== 200) {
          throw new Error('返回的状态数据无效');
        }
        // 更新数据
        this.lastUpdateTime = res.last_update_time;
        this.statusDetail = res.status;
        appStore.statusUpdateTimeDiff = Date.now() - this.lastUpdateTime;
        // 清除底栏颜色和文字
        appStore.bottomBarBgColor = null;
        appStore.bottomBarText = null;
      } catch (err) {
        console.error(err);
        appStore.bottomBarBgColor = 'error';
        appStore.bottomBarText = '数据更新失败，点此重试';
        throw err;
      } finally {
        this.isFetchingData = false;
      }
    },
  },
});
