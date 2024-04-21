import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import compression from 'compression';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Main');

  // process.on(
  //   'uncaughtException',
  //   (message: any, stack?: string, context?: string) => {
  //     console.error(message);
  //     console.error(stack);
  //     console.assert(!context, context);
  //   },
  // );
  // process.on(
  //   'unhandledRejection',
  //   (message: any, stack?: string, context?: string) => {
  //     console.error(message);
  //     console.error(stack);
  //     console.assert(!context, context);
  //   },
  // );

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    // logger: ['error', 'warn', 'log', 'debug','verbose'],
    // bufferLogs: true,
    // logger: false,
    // logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
    origin: true,
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

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

  app.use(compression());

  const port: number = +configService.getOrThrow<number>('PORT');

  await app.listen(port, async () => {
    logger.log(`App Running On Port: ${await app.getUrl()}`);
    logger.log(`

░▒▓█▓▒░▒▓████████▓▒░░▒▓██████▓▒░  
░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░▒▓██████▓▒░ ░▒▓████████▓▒░ 
░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░ 
`);
  });
}
bootstrap();
