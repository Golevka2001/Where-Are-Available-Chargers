// 组件状态管理

import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';

const hexToRgb = (hex: string): number[] => {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return [r, g, b];
};

export const useAppStore = defineStore('app', {
  state: () => ({
    isAppSideDrawerOpen: false,
    isBottomBarVisible: false,
    isFooterVisible: true,
    isSemiTransparentSupported: true,
    isStatusDetailDrawerOpen: false,

    statusUpdateTimeDiff: 0, // 当前时间与数据更新时间的差值（毫秒时间戳）

    bottomBarBgColor: null as string | null,
    bottomBarText: null as string | null,
    curStationIndex: 0, // 当前状态详情抽屉中所显示的充电站的名称

    dataExpirationTime: 60 * 1000, // 过期时间
  }),
  getters: {
    getSuccessRgb: (): number[] => {
      return hexToRgb(useTheme().current.value.colors.success);
    },
    getWarningRgb: (): number[] => {
      return hexToRgb(useTheme().current.value.colors.warning);
    },
    // 底栏背景色
    getBottomBarBgColor(state: any): string {
      // 强制显示颜色
      if (state.bottomBarBgColor !== null) {
        return state.bottomBarBgColor;
      }
      // 过期时间的 1/6 前：绿色
      if (state.statusUpdateTimeDiff < this.dataExpirationTime / 6) {
        return 'success';
      }
      // 过期：橙色
      if (state.statusUpdateTimeDiff > this.dataExpirationTime) {
        return 'warning';
      }
      // 之间：渐变
      const percent = state.statusUpdateTimeDiff / this.dataExpirationTime;
      const gradientColor = [
        state.getSuccessRgb[0] +
          (state.getWarningRgb[0] - state.getSuccessRgb[0]) * percent,
        state.getSuccessRgb[1] +
          (state.getWarningRgb[1] - state.getSuccessRgb[1]) * percent,
        state.getSuccessRgb[2] +
          (state.getWarningRgb[2] - state.getSuccessRgb[2]) * percent,
      ];
      return `rgb(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]})`;
    },
    // 底栏文字
    getBottomBarText(state: any): string {
      // 强制显示文字
      if (state.bottomBarText !== null) {
        return state.bottomBarText;
      }
      if (state.statusUpdateTimeDiff > this.dataExpirationTime) {
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
    updateDataExpirationTime(expirationTime: number) {
      this.dataExpirationTime = expirationTime;
    },
  },
});
