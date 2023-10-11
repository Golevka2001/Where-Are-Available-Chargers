import { defineStore } from 'pinia';
import { StatusManager } from '@/types/status-manager';

export const useAppStore = defineStore('app', {
  state: () => ({
    // 组件状态管理
    isDrawerOpen: false,
    isFooterVisible: true,

    // 数据状态管理
    statusManager: new StatusManager(),

    // 前端配置
    config: {
      // 状态查询、显示相关
      autoUpdateMaxTimes: 6, // 自动更新最大次数
      autoUpdateInterval: 30 * 1000, // 前端自动拉取数据间隔
      backendUpdateInterval: 20 * 1000, // 后端数据更新间隔（要与后端同步）
      dataExpirationTime: 1.5 * 60 * 1000, // 提示数据过期时间
      stationThresholdPercentage: 0.25, // TODO: 改判定方式

      // 组件显示相关
      bottomBarInterval: 1000, // 底栏定时器间隔
      bottomBarShowDelay: 1.5 * 1000, // 底栏隐藏后再次显示的延迟时间
      drawerCloseDelay: 0.2 * 1000, // 侧栏被点击后关闭的延迟时间

      // 静态资源相关
      latestMapPath: '/img/map-20230919.webp',
    },
  }),
});
