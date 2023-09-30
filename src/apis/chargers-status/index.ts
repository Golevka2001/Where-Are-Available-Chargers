import axios from 'axios';
import type { UpdateMessage } from '@/types/update_message';
import type { StatusDetail } from '@/types/status-detail';

export const getChargersStatus = async (): Promise<{
  update_message: UpdateMessage;
  status_detail: StatusDetail;
}> => {
  let apiUrl = '';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://127.0.0.1:3000/api/get_status';
  }
  // TODO：生产环境记得修改为后端提供的接口地址
  else {
    apiUrl = '【接口地址】';
  }
  const res = await axios.get(apiUrl);
  // TODO：根据后端返回的格式相应调整
  return res.data.testData;
};
