import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import compression from 'compression';

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
    cors: false,
    // bufferLogs: true,
    // logger: false,
    // logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  //   );
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  // });

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

    ██████╗ ██████╗ ███╗   ███╗███████╗
    ██╔══██╗██╔══██╗████╗ ████║██╔════╝
    ██████╔╝██████╔╝██╔████╔██║███████╗
    ██╔══██╗██╔═══╝ ██║╚██╔╝██║╚════██║
    ██████╔╝██║     ██║ ╚═╝ ██║███████║
    ╚═════╝ ╚═╝     ╚═╝     ╚═╝╚══════╝
                                       `);
  });
}
bootstrap();
