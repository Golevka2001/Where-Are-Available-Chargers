import axios from 'axios';
import type { WeatherResponse } from '@/types/weather';

export const getWeatherData = async (): Promise<WeatherResponse> => {
  const res = await axios.get('/weather/jiulonghu').catch((err) => {
    throw new Error('天气数据请求失败：' + err.message);
  });
  return res.data;
};
