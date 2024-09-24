import axios from 'axios';
import type { WeatherResponse } from '@/types/weather';
import { campusConfig } from '@/types/campus-config';

export const getWeatherData = async (
  campus: campusConfig,
): Promise<WeatherResponse> => {
  const res = await axios.get(campus.weatherApiPath).catch((err) => {
    throw new Error('天气数据请求失败：' + err.message);
  });
  return res.data;
};
