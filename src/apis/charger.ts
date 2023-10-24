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
        err.response &&
        err.response.status === 403 &&
        err.response.headers['cf-mitigated'] === 'challenge'
      ) {
        return { data: { last_update_time: 0, status: undefined, code: 766 } };
      } else throw new Error('充电桩状态请求失败：' + err.message);
    });
  return res.data;
};
