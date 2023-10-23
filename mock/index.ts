import { MockMethod } from 'vite-plugin-mock';

import { genRandomStatusData } from './status-gen';
import { genRandomWeatherData } from './weather-gen';

export default [
  {
    url: '/api/get_status',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    rawResponse: (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(genRandomStatusData()));
    },
  },
  {
    url: '/api/weather/jiulonghu',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    rawResponse: (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(genRandomWeatherData()));
    },
  },
] as MockMethod[];
