const config = {
  // 状态查询、显示相关
  autoUpdateMaxTimes: 6, // 自动更新最大次数
  autoUpdateInterval: 30 * 1000, // 前端自动拉取数据间隔
  backendUpdateInterval: 20 * 1000, // 后端数据更新间隔（要与后端同步）
  dataExpirationTime: 1.5 * 60 * 1000, // 提示数据过期时间
  stationThresholdPercentage: 0.25, // TODO: 改判定方式
  statusRequestTimeout: 10 * 1000, // 状态请求超时时间

  // 组件显示相关
  // 底栏
  bottomBarUpdateInterval: 1000, // 底栏定时器更新间隔
  bottomBarInitDelay: 0.5 * 1000, // 底栏初始弹出的延迟时间
  bottomBarReshowDelay: 1.5 * 1000, // 底栏隐藏后再次弹出的延迟时间
  // 侧栏
  drawerCloseDelay: 0.2 * 1000, // 侧栏被点击后关闭的延迟时间
  // 进度条
  progressBarHideDelay: 0.5 * 1000, // 页面跳转完成后进度条隐藏的延迟时间
  progressBarMinUpdateTimes: 5, // 进度条最小更新次数（不完全是最小，会被路由守卫打断）
  progressBarUpdateIntervalRange: [100, 500], // 进度条更新间隔范围
  progressBarValues: [0, 70, 100], // 进度条在 `beforeEach`、`beforeResolve`、`afterEach` 时的值

  surveyUrl: 'https://forms.larksuite.com/m/cfm?t=sLfgofRTAwMi-5i3x',
};

// 开发环境：
if (process.env.NODE_ENV === 'development') {
  config.autoUpdateInterval = 5 * 1000;
  config.backendUpdateInterval = 2 * 1000;
  config.dataExpirationTime = 10 * 1000;
  // config.statusRequestTimeout = 1.3 * 1000;
}

export default config;
