import axios from 'axios';
import { StatusResponse } from '@/types/status-response';

export const getChargersStatus = async (): Promise<StatusResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'api/get_status';
  const res = await axios.get(apiUrl);
  return res.data;
};
