import axios from 'axios';
import config from '@/config';
import { StatusResponse } from '@/types/charger';

export const getChargersStatus = async (): Promise<StatusResponse> => {
  const res = await axios
    .get('/get_status', {
      timeout: config.statusRequestTimeout,
    })
    .catch((err) => {
      throw new Error('充电桩状态请求失败：' + err.message);
    });
  return res.data;
};
