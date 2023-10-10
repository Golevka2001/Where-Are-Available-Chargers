import { getChargersStatus } from '@/apis/chargers-status';
import { StatusDetail } from './status-detail';
import { StatusResponse } from './status-response';

export class StatusManager {
  lastUpdateTime: number;
  statusDetail: StatusDetail;
  isFetchingData: boolean;

  constructor(response?: StatusResponse) {
    this.lastUpdateTime = response?.last_update_time || 0;
    this.statusDetail = response?.status || {
      total_count: 0,
      available_count: 0,
      stations: [],
    };
    this.isFetchingData = false;
  }

  async updateData(isRefresh: boolean = false): Promise<void> {
    // `isRefresh` 用于区分加载页面时的刷新和手动刷新
    // 加载 status 页面时会显示 loading 后再显示数据
    // 而手动刷新时大概率页面已经有了数据，不用显示 loading
    if (!isRefresh) {
      this.isFetchingData = true;
    }
    const response = await getChargersStatus();
    this.lastUpdateTime = response.last_update_time;
    this.statusDetail = response.status;
    if (!isRefresh) {
      this.isFetchingData = false;
    }
  }
}
