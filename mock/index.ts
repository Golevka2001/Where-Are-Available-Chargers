import { MockMethod } from 'vite-plugin-mock';

import { genRandomStatusData } from './status-gen';
import { genRandomWeatherData } from './weather-gen';

// const CHALLENGE_RATE = 0.35;
const CHALLENGE_RATE = 0;

export default [
  {
    url: '/api/get_status',
    method: 'get',
    statusCode: 200,
    timeout: Math.floor(Math.random() * 1000) + 500,
    rawResponse: (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (Math.random() < CHALLENGE_RATE) {
        // 模拟发生质询的情况
        res.setHeader('cf-mitigated', 'challenge');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.statusCode = 403;
        res.end(`
<!doctype html>
<html lang="zh-CN">
<head>
  <title>验证码</title>
</head>
<body>
123456
</body>
`);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(genRandomStatusData()));
      }
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
  {
    url: '/api/challenge',
    method: 'get',
    statusCode: 403,
    timeout: Math.floor(Math.random() * 1000) + 500,
    rawResponse: (req, res) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(`
<!doctype html>
<html lang="zh-CN">
<head>
  <title>验证码</title>

  <meta charset="utf-8" />
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
      body {
          background-color: #f0f0f2;
          margin: 0;
          padding: 0;

      }
      div {
          width: 600px;
          margin: 5em auto;
          padding: 2em;
          background-color: #fdfdff;
          border-radius: 0.5em;
          box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
      }
      a:link, a:visited {
          color: #38488f;
          text-decoration: none;
      }
      @media (max-width: 700px) {
          div {
              margin: 0 auto;
              width: auto;
          }
      }
      @media screen and (prefers-color-scheme: dark) {
            html {
                filter: invert(0.88) hue-rotate(180deg);
            }
        }
  </style>
</head>

<body>
<div>
  <h1>模拟验证质询</h1>
  <p>该页表示正在进行验证码</p>
  <p><button onclick="window.parent.postMessage('verificationComplete', '*')">点击此处验证通过</button></p>
</div>
</body>
</html>
`);
    },
  },
] as MockMethod[];
