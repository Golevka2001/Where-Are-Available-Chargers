import type { RawSkycon, WeatherResponse } from '../src/types/weather';

const SKYCON_POOL = [
  'CLEAR_DAY', // 晴（白天）
  'CLEAR_NIGHT', // 晴（夜间）
  'PARTLY_CLOUDY_DAY', // 多云（白天）
  'PARTLY_CLOUDY_NIGHT', // 多云（夜间）
  'CLOUDY', // 阴
  'LIGHT_HAZE', // 轻度雾霾
  'MODERATE_HAZE', // 中度雾霾
  'HEAVY_HAZE', // 重度雾霾
  'LIGHT_RAIN', // 小雨
  'MODERATE_RAIN', // 中雨
  'HEAVY_RAIN', // 大雨
  'STORM_RAIN', // 暴雨
  'FOG', // 雾
  'LIGHT_SNOW', // 小雪
  'MODERATE_SNOW', // 中雪
  'HEAVY_SNOW', // 大雪
  'STORM_SNOW', // 暴雪
  'DUST', // 浮尘
  'SAND', // 沙尘
  'WIND', // 大风
];

const genSkycon = (): string => {
  const randomIndex = Math.floor(Math.random() * SKYCON_POOL.length);
  return SKYCON_POOL[randomIndex];
};

const genSkyconList = (): RawSkycon[] => {
  const currentTime = new Date();
  const skyconList: RawSkycon[] = [];

  // 生成从当前时刻开始的未来10小时的天气数据
  for (let i = 0; i < 10; i++) {
    const datetime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours() + 8 + i,
    ).toISOString(); // 取整点，ISO 会丢失时区，所以要加8小时
    const skycon = genSkycon();

    skyconList.push({
      datetime: datetime,
      value: skycon,
    });
  }

  return skyconList;
};

export const genRandomWeatherData = (): WeatherResponse => {
  const hourlyData = {
    description: '未来24小时晴',
    skycon: genSkyconList(),
  };

  return {
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    hourly: hourlyData,
  };
};
