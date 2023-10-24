import axios from 'axios';
import config from '@/config';
import { StatusResponse } from '@/types/charger';
import router from '@/router';

export const getChargersStatus = async (): Promise<StatusResponse> => {
  const res = await axios
    .get('/get_status', {
      timeout: config.statusRequestTimeout,
    })
    .catch((err) => {
      // 先处理质询
      if (
        err.response &&
        err.response.status === 403 &&
        err.response.headers['cf-mitigated'] === 'challenge'
      ) {
        router.push({
          path: '/challenge',
          query: {
            callback: router.currentRoute.value.fullPath,
          },
        });
      } else throw new Error('充电桩状态请求失败：' + err.message);
    });
  return res.data;
};
