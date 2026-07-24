// 组件状态管理

import { defineStore } from 'pinia';

const hexToRgb = (hex: string): number[] => {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return [r, g, b];
};

// 从 vuetify 配置直接导入颜色
const THEME_COLORS = {
  light: {
    success: '#86B300',
    warning: '#F2AE49',
  },
  dark: {
    success: '#AAD94C',
    warning: '#FFB454',
  },
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
      // 根据当前主题选择颜色
      const isDark =
        document.documentElement.classList.contains('v-theme--dark');
      return hexToRgb(
        isDark ? THEME_COLORS.dark.success : THEME_COLORS.light.success,
      );
    },
    getWarningRgb: (): number[] => {
      const isDark =
        document.documentElement.classList.contains('v-theme--dark');
      return hexToRgb(
        isDark ? THEME_COLORS.dark.warning : THEME_COLORS.light.warning,
      );
    },
    // 底栏背景色
    getBottomBarBgColor(state): string {
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
        this.getSuccessRgb[0] +
          (this.getWarningRgb[0] - this.getSuccessRgb[0]) * percent,
        this.getSuccessRgb[1] +
          (this.getWarningRgb[1] - this.getSuccessRgb[1]) * percent,
        this.getSuccessRgb[2] +
          (this.getWarningRgb[2] - this.getSuccessRgb[2]) * percent,
      ];
      return `rgb(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]})`;
    },
    // 底栏文字
    getBottomBarText(state): string {
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
