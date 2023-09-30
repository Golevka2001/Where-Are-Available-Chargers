export interface StatusOverview {
  [stationName: string]: {
    [chargerName: string]: number;
    availableCount: number;
    totalCount: number;
  };
}
