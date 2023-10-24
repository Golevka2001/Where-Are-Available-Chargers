import axios from 'axios';
import config from '@/config';
import { StatusResponse } from '@/types/charger';

export const getChargersStatus = async (): Promise<StatusResponse> => {
  const res = await axios
    .get('/get_status', {
      timeout: config.statusRequestTimeout,
    })
    .catch((err) => {
      // 先处理质询
      if (
        err.response.status === 403 &&
        err.response.headers['cf-mitigated'] === 'challenge'
      ) {
        // 如果用 router.push 有很奇怪的 bug，不会修，所以用 window.location.href
        window.location.href =
          '/challenge?' + encodeURIComponent(window.location.pathname);
      } else throw new Error('充电桩状态请求失败：' + err.message);
    });
  if (!res.data) return { last_update_time: 0, status: undefined, code: 403 };
  return res.data;
};
