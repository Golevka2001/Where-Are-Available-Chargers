// src/tasks/weather.ts - 天气数据同步

import { Env } from '../types/env';
import { CAMPUS_LIST, CAMPUS_CONFIG } from '../config';
import { WeatherService } from '../services/weather/service';
import { setCampusWeather } from '../storage/kv';

export async function syncWeatherData(env: Env): Promise<void> {
  const service = new WeatherService(env);
  const errors: Error[] = [];

  for (const campusId of CAMPUS_LIST) {
    try {
      const { lat, lng } = CAMPUS_CONFIG[campusId].gps;
      const weather = await service.getWeather(lat, lng);
      await setCampusWeather(env, campusId, weather);
      console.log(`Synced weather data for ${campusId}`);
    } catch (e) {
      console.error(`Failed to sync weather data for ${campusId}:`, e);
      errors.push(e as Error);
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Weather sync failed for ${errors.length} campus(es): ${errors[0].message}`,
    );
  }
}
