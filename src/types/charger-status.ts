import { SocketStatus } from './socket-status';

export interface ChargerStatus {
  name: string;
  description: string | null | undefined;
  fault_info: string | null | undefined;
  total_count: number;
  available_count: number;
  sockets: SocketStatus[];
}
