const config = {
  // 状态查询、显示相关
  autoUpdateMaxTimes: 6, // 自动更新最大次数
  autoUpdateInterval: 30 * 1000, // 前端自动拉取数据间隔
  backendUpdateInterval: 20 * 1000, // 后端数据更新间隔（要与后端同步）
  dataExpirationTime: 1.5 * 60 * 1000, // 提示数据过期时间
  stationThresholdPercentage: 0.25, // TODO: 改判定方式
  statusRequestTimeout: 10 * 1000, // 状态请求超时时间

  // 组件显示相关
  bottomBarUpdateInterval: 1000, // 底栏定时器更新间隔
  bottomBarInitDelay: 0.5 * 1000, // 底栏初始弹出的延迟时间
  bottomBarReshowDelay: 1.5 * 1000, // 底栏隐藏后再次弹出的延迟时间
  drawerCloseDelay: 0.2 * 1000, // 侧栏被点击后关闭的延迟时间

  // 静态资源相关
  latestMapPath: '/img/map-20230919.webp',
  surveyUrl: 'https://forms.larksuite.com/m/cfm?t=sLfgofRTAwMi-5i3x',
};

// 开发环境：
if (process.env.NODE_ENV === 'development') {
  config.autoUpdateInterval = 5 * 1000;
  config.backendUpdateInterval = 2 * 1000;
  config.dataExpirationTime = 10 * 1000;
  config.statusRequestTimeout = 1.5 * 1000;
}

export default config;
