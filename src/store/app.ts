// 组件状态管理

import { defineStore } from 'pinia';
import config from '@/config';

export const useAppStore = defineStore('app', {
  state: () => ({
    isAppSideDrawerOpen: false,
    isBottomBarVisible: false,
    isFooterVisible: true,
    isSnackBarVisible: false,
    isStatusDetailDrawerOpen: false,

    statusUpdateTimeDiff: 0, // 当前时间与数据更新时间的差值（毫秒时间戳）

    bottomBarBgColor: null as string | null,
    bottomBarText: null as string | null,
    curStationIndex: 0, // 当前状态详情抽屉中所显示的充电站的名称
    snackBarBgColor: '',
    snackBarText: '',
  }),
  getters: {
    // 底栏背景色
    getBottomBarBgColor: (state: any): string => {
      // 强制显示颜色
      if (state.bottomBarBgColor !== null) {
        return state.bottomBarBgColor;
      }
      // 过期时间的 1/6 前：绿色
      if (state.statusUpdateTimeDiff < config.dataExpirationTime / 6) {
        return 'green';
      }
      // 过期：红色
      if (state.statusUpdateTimeDiff > config.dataExpirationTime) {
        return 'orange';
      }
      // 之间：绿[rgb(76, 175, 80)] -> 橙[rgb(255, 152, 0)]
      const percent = state.statusUpdateTimeDiff / config.dataExpirationTime;
      const r = 76 + Math.floor((255 - 76) * percent);
      const g = 175 + Math.floor((152 - 175) * percent);
      const b = 80 + Math.floor((0 - 80) * percent);
      return `rgb(${r}, ${g}, ${b})`;
    },
    // 底栏文字
    getBottomBarText: (state: any): string => {
      // 强制显示文字
      if (state.bottomBarText !== null) {
        return state.bottomBarText;
      }
      if (state.statusUpdateTimeDiff > config.dataExpirationTime) {
        return '数据已过期，点此刷新';
      }
      const diffSeconds = Math.floor(state.statusUpdateTimeDiff / 1000);
      if (diffSeconds < 5) {
        return `更新于 刚刚`;
      } else if (diffSeconds < 60) {
        return `更新于 ${diffSeconds} 秒前`;
      } else if (diffSeconds < 3600) {
        return `更新于 ${Math.floor(diffSeconds / 60)} 分钟前`;
      } else if (diffSeconds < 86400) {
        return `更新于 ${Math.floor(diffSeconds / 3600)} 小时前`;
      } else {
        return `更新于 ${Math.floor(diffSeconds / 86400)} 天前`;
      }
    },
  },
  actions: {
    openStatusDetailDrawer(stationIndex: number) {
      this.isAppSideDrawerOpen = false;
      this.curStationIndex = stationIndex;
      this.isStatusDetailDrawerOpen = true;
    },
    showSnackBar(text: string, bgColor: string) {
      this.snackBarBgColor = bgColor;
      this.snackBarText = text;
      this.isSnackBarVisible = true;
    },
  },
});
