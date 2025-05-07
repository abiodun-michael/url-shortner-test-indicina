export interface UrlStats {
  visitCount: number;
  uniqueVisitorCount: number;
  lastVisitAt: string;
}

export interface IStatisticsProvider {
  updateStat(urlPath: string, deviceId: string): Promise<void>;
  getStat(urlPath: string): Promise<UrlStats>;
} 