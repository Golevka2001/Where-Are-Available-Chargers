import { getChargersStatus } from '@/apis/chargers-status';
import type { UpdateMessage } from '@/types/update_message';
import type { StatusDetail } from '@/types/status-detail';
import type { StatusOverview } from '@/types/status-overview';

export class StatusManager {
  updateMessage: UpdateMessage;
  statusDetail: StatusDetail;
  statusOverview: StatusOverview;
  availableCount: number;
  totalCount: number;
  isFetchingData: boolean;

  constructor(response?: {
    update_message: UpdateMessage;
    status_detail: StatusDetail;
  }) {
    // TODO：若有变动记得修改
    this.updateMessage = {};
    this.updateMessage.lastSuccessStartTime =
      response?.update_message?.last_success_start_time || 0;
    this.updateMessage.lastSuccessEndTime =
      response?.update_message?.last_success_end_time || 0;
    this.statusDetail = response?.status_detail || {};
    this.statusOverview = {};
    this.availableCount = 0;
    this.totalCount = 0;
    this.isFetchingData = false;
  }

  async updateData(): Promise<void> {
    this.isFetchingData = true;
    const response = await getChargersStatus();
    // TODO：若有变动记得修改
    this.updateMessage.lastSuccessStartTime =
      response.update_message.last_success_start_time;
    this.updateMessage.lastSuccessEndTime =
      response.update_message.last_success_end_time;
    this.statusDetail = response.status_detail;
    this.updateOverviewData();
    this.isFetchingData = false;
  }

  private updateOverviewData(): void {
    this.statusOverview = {};
    // 遍历充电站（地点）：东门北侧、东门南侧、西门北侧...
    for (const stationName in this.statusDetail) {
      this.statusOverview[stationName] = { availableCount: 0, totalCount: 0 };
      // 遍历充电桩（编号）：A、B、C...
      for (const chargerName in this.statusDetail[stationName]) {
        this.statusOverview[stationName][chargerName] = 0;
        const chargerStatus = this.statusDetail[stationName][chargerName];
        // 充电桩可用插座数
        if (chargerStatus) {
          this.statusOverview[stationName][chargerName] = chargerStatus.filter(
            (status) => status === 1,
          ).length;
        }
        // 充电站可用插座数
        this.statusOverview[stationName].availableCount +=
          this.statusOverview[stationName][chargerName];
        // 充电站总插座数
        if (chargerStatus) {
          this.statusOverview[stationName].totalCount += chargerStatus.length;
        }
      }
      // 总可用插座数
      this.availableCount += this.statusOverview[stationName].availableCount;
      // 总插座数
      this.totalCount += this.statusOverview[stationName].totalCount;
    }
  }
}
