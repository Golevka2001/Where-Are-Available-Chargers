export interface campusConfig {
  id: string;
  name: string;
  weatherApiPath: string;
  statusApiPath: string;
  autoUpdateMaxTimes: number; // 自动更新最大次数
  autoUpdateInterval: number; // 前端自动拉取数据间隔
  backendUpdateInterval: number; // 后端数据更新间隔（要与后端同步）
  dataExpirationTime: number; // 提示数据过期时间
  stationThresholdPercentage: number; // 充电站余量紧张的阈值
  statusRequestTimeout: number; // 状态请求超时时间
}
