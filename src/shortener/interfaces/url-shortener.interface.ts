export interface ShortenedUrl {
  message: string;
  status: boolean;
  data: {
    url: string;
    urlPath: string;
  };
}

export interface OriginalUrl {
  message: string;
  status: boolean;
  data: {
    destinationUrl: string;
    aliasOrCode: string;
    qrcode: string;
  };
}

export interface IUrlShortener {
  encode(url: string, alias?: string, deviceId?: string): Promise<ShortenedUrl>;
  decode(urlPath: string, deviceId?: string): Promise<OriginalUrl>;
  getAll(deviceId: string): Promise<any>;
  getStats(urlPath: string, deviceId: string): Promise<any>;
} 