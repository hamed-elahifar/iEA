import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import { altairExpress } from 'altair-express-middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const options = new DocumentBuilder()
    .setTitle('IEA API')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
        in: 'header'
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://srv.cloudium.ir:3000/', 'Staging')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    // credentials: true,
    origin: '*',
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

  // app.use(
  //   '/graphql',
  //   altairExpress({
  //     endpointURL: '/graphql',
  //     subscriptionsEndpoint: '/graphql',
  //     subscriptionsProtocol: 'ws',
  //     initialSettings: {
  //       'theme.editorFontFamily':
  //         "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
  //       'theme.fontsize': 24,
  //       theme: 'dark',
  //       enableExperimental: false,
  //       'request.withCredentials': true,
  //     },
  //   }),
  // );

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
