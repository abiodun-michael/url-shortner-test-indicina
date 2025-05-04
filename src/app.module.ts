import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl)],
})
export class AppModule { }
