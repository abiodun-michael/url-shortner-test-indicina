import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { createClient, RedisClientType, SetOptions } from "redis";
import { config } from "src/config";

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly redis: RedisClientType<any>;


  constructor(

  ) {
    this.redis = createClient({
      url: config.redisUrl
    });
  }

  async onModuleInit() {
    await this.redis.connect();
  }

  async set(key: string, value: string | Buffer | number, opts?: SetOptions) {
    try {
      const result = await this.redis.set(key, value, opts);

      return result;
    } catch (error) {

      throw new Error("Failed to set value in Redis");
    }
  }

  async get(key: string) {
    try {
      const result = await this.redis.get(key);

      return result;
    } catch (error) {

      throw new Error("Failed to get value from Redis");
    }
  }

  async updateStat(urlPath: string, deviceId: string) {
    try {

      const pipeline = this.redis.multi();

      pipeline.sAdd(`visitors:${urlPath}`, deviceId);
      pipeline.set(`lastVisit:${urlPath}`, new Date().toDateString());
      pipeline.incr(`visits:${urlPath}`);

      await pipeline.exec();

    } catch (error) {
      throw error;
    }
  }


  async getStat(urlPath: string) {
    try {
      const visits = await this.redis.get(`visits:${urlPath}`);
      const uniqueVisitorCount = await this.redis.sCard(`visitors:${urlPath}`);
      const lastVisitAt = await this.redis.get(`lastVisit:${urlPath}`);

      return {
        visitCount: visits,
        uniqueVisitorCount,
        lastVisitAt
      };
    } catch (error) {
      throw error;
    }
  }
  async del(key: string) {
    try {
      const result = await this.redis.del(key);

      return result;
    } catch (error) {

      throw new Error("Failed to delete key from Redis");
    }
  }


  getClient() {
    return this.redis;
  }


}
