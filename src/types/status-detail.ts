export interface StatusDetail {
  [stationName: string]: {
    [chargerName: string]: number[] | null;
  };
}
