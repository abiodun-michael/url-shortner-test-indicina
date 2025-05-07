import { DynamicModule, Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient, RedisClientType } from 'redis';
import { config } from 'src/config';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule { }
