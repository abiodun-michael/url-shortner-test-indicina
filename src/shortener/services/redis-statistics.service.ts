import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { IStatisticsProvider, UrlStats } from '../interfaces/statistics.interface';

@Injectable()
export class RedisStatisticsProvider implements IStatisticsProvider {
  private readonly logger = new Logger(RedisStatisticsProvider.name);

  constructor(private readonly redisService: RedisService) {}

  async updateStat(urlPath: string, deviceId: string): Promise<void> {
    try {
      const pipeline = this.redisService.getClient().multi();

      pipeline.sAdd(`visitors:${urlPath}`, deviceId);
      pipeline.set(`lastVisit:${urlPath}`, new Date().toDateString());
      pipeline.incr(`visits:${urlPath}`);

      await pipeline.exec();
    } catch (error) {
      this.logger.error(`Failed to update stats: ${error.message}`, error.stack);
      throw new Error(`Failed to update stats: ${error.message}`);
    }
  }

  async getStat(urlPath: string): Promise<UrlStats> {
    try {
      const visits = await this.redisService.get(`visits:${urlPath}`);
      const uniqueVisitorCount = await this.redisService.getClient().sCard(`visitors:${urlPath}`);
      const lastVisitAt = await this.redisService.get(`lastVisit:${urlPath}`);

      return {
        visitCount: visits ? parseInt(visits) : 0,
        uniqueVisitorCount,
        lastVisitAt: lastVisitAt || new Date().toDateString()
      };
    } catch (error) {
      this.logger.error(`Failed to get stats: ${error.message}`, error.stack);
      throw new Error(`Failed to get stats: ${error.message}`);
    }
  }
} 