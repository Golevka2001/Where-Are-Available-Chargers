import { StationStatus } from './station-status';

export interface StatusDetail {
  total_count: number;
  available_count: number;
  stations: StationStatus[];
}
