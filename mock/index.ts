import { genRandomStatusData } from './status-gen';
import { genRandomWeatherData } from './weather-gen';

export default [
  {
    url: '/api/get_status',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    response: () => {
      return genRandomStatusData();
    },
  },
  {
    url: '/api/weather/jiulonghu',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    response: () => {
      return genRandomWeatherData();
    },
  },
];
