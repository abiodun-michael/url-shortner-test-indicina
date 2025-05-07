require('dotenv').config();
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Indicina')
    .setDescription('URL Shortener')
    .setVersion('v3')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());

  await app.listen(config.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Server Application Started!
      API V1: http://localhost:${config.port}
      API Docs: http://localhost:${config.port}/docs
      Microserservice Started Successfully
      ------------
`);
});
