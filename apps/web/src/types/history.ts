export interface HistoryRecord {
  timestamp: number;
  total_count: number;
  available_count: number;
  fault_count: number;
}

export interface HistoryResponse {
  code: number;
  campus_id: string;
  data: HistoryRecord[];
}
