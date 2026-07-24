import axios from 'axios';
import { StatusResponse } from '@/types/charger';
import { CampusConfig } from '@/types/campus-config';

export const getChargersStatus = async (
  campus: CampusConfig,
): Promise<StatusResponse> => {
  const res = await axios
    .get(campus.statusApiPath, {
      timeout: campus.statusRequestTimeout,
    })
    .catch((err) => {
      throw new Error('充电桩状态请求失败：' + err.message);
    });
  return res.data;
};
