import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { ShortenerModule } from './shortener/shortener.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), ScheduleModule.forRoot(), ShortenerModule, RedisModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule { }
