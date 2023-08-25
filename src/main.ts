console.clear();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const logger = new Logger('Main');

  process.on('uncaughtException', (uncaughtException) => {
    logger.error('uncaughtException', uncaughtException);
  });
  process.on('unhandledRejection', (unhandledRejection) => {
    logger.error('unhandledRejection', unhandledRejection);
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);

  // app.useStaticAssets(join(__dirname, '..', 'static'));

  if (eval(configService.get('MONGO_DEBUG'))) {
    mongoose.set('debug', true);
  }

  const port: number = +configService.getOrThrow<number>('PORT');
  await app.listen(port);
}
bootstrap();
