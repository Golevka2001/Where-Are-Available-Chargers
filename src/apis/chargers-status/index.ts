import axios from 'axios';
import type { UpdateMessage } from '@/types/update_message';
import type { StatusDetail } from '@/types/status-detail';

export const getChargersStatus = async (): Promise<{
  update_message: UpdateMessage;
  status_detail: StatusDetail;
}> => {
  const apiUrl = process.env.API_URL || 'api/get_status';
  const res = await axios.get(apiUrl);
  // TODO：根据后端返回的格式相应调整
  return res.data.testData;
};
