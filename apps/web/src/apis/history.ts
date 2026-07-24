import axios from 'axios';
import type { HistoryResponse } from '@/types/history';

export async function getChargerHistory(
  campusId: string,
  range?: string,
  start?: Date,
  end?: Date,
): Promise<HistoryResponse> {
  const params: Record<string, string> = {};
  if (start && end) {
    params.start = start.getTime().toString();
    params.end = end.getTime().toString();
  } else {
    params.range = range || '24h';
  }

  const response = await axios.get<HistoryResponse>(`/history/${campusId}`, {
    params,
  });
  return response.data;
}
