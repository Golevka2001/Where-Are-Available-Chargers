const config = {
  // 状态查询、显示相关
  autoUpdateMaxTimes: 6, // 自动更新最大次数
  autoUpdateInterval: 30 * 1000, // 前端自动拉取数据间隔
  backendUpdateInterval: 20 * 1000, // 后端数据更新间隔（要与后端同步）// TODO：改为从后端获取
  dataExpirationTime: 1.5 * 60 * 1000, // 提示数据过期时间
  stationThresholdPercentage: 0.25, // TODO：改判定方式
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
  // 叠层
  zIndex: {
    appTopBar: 1500,
    shareMenu: 1400,
    appSideDrawer: 1300,
    bottomInfoBar: 1200,
    statusDetailDrawer: 1100,
    overlay: 1000,
  },

  classicVersionUrl: 'https://chargers.injs.eu/classical', // 旧版页面地址（用于`侧栏-回到旧版`）
  surveyUrl: 'https://forms.larksuite.com/m/cfm?t=sLfgofRTAwMi-5i3x', // 反馈问卷地址（用于`反馈页面`）
  tencentMapUrl:
    'https://apis.map.qq.com/tools/poimarker?' +
    'type=0' +
    '&marker=coord:{lat},{lng};title:{title};addr:{addr}' +
    `&key=${import.meta.env.VITE_TENCENT_MAP_KEY}` +
    `&referer=${import.meta.env.VITE_TENCENT_MAP_APP_NAME}`, // 腾讯地图标记点地址，花括号内为待填充参数（用于`地图页面`）
  thisSiteUrl: 'https://chargers.injs.eu', // 当前本站地址（用于`分享菜单`）
};

// 开发环境：
if (import.meta.env.DEV) {
  config.autoUpdateMaxTimes = 3;
  config.autoUpdateInterval = 5 * 1000;
  config.backendUpdateInterval = 2 * 1000;
  config.dataExpirationTime = 10 * 1000;
  // config.statusRequestTimeout = 1.3 * 1000;
}

export default config;
