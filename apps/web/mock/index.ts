import { MockMethod } from 'vite-plugin-mock';

import { genRandomStatusData } from './status-gen';
import { genRandomWeatherData } from './weather-gen';

export default [
  {
    url: '/api/campuses',
    method: 'get',
    statusCode: 200,
    rawResponse: (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(
        JSON.stringify({
          code: 200,
          campuses: [
            { id: 'jiulonghu', name: '九龙湖' },
            { id: 'sipailou', name: '四牌楼' },
            { id: 'dingjiaqiao', name: '丁家桥' },
          ],
        }),
      );
    },
  },
  {
    url: '/api/get_status/:campus',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    rawResponse: (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const campusId =
        req.url?.match(/\/api\/get_status\/(\w+)/)?.[1] || 'jiulonghu';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(genRandomStatusData(campusId)));
    },
  },
  {
    url: '/api/weather/:campus',
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
