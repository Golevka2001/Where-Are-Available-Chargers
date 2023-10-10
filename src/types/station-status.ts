import { ChargerStatus } from './charger-status';

export interface StationStatus {
  name: string;
  description: string | null | undefined;
  total_count: number;
  available_count: number;
  chargers: ChargerStatus[];
}
