import express from 'express';
import { genRandomStatusData } from './status-gen';
import { genRandomWeatherData } from './weather-gen';

const app = express();

app.get('/api/get_status', (req, res) => {
  setTimeout(
    () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(genRandomStatusData());
    },
    Math.random() * 500 + 1000,
  );
});

app.get('/api/weather/jiulonghu', (req, res) => {
  setTimeout(
    () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(genRandomWeatherData());
    },
    Math.random() * 500 + 1000,
  );
});

export const handler = app;
