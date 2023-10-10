import { StatusDetail } from './status-detail';

export interface StatusResponse {
  code: number;
  last_update_time: number;
  status: StatusDetail;
}
