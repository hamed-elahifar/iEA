import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { BaseModule } from './modules/base/base.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DateScalar } from './modules/common/scalars/date.scalar';
import { PubSubModule } from './modules/pub-sub/pub-sub.module';
import { validate } from './modules/common/validators/env.validation';
import { ThrottlerModule } from '@nestjs/throttler';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Environment } from './modules/common/enums/environments.enum';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/common/guards/roles.guard';
import { AccessTokenGuard } from './modules/common/guards/access-token.guard';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTrace,
} from 'apollo-server-core';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: `.env`,
      cache: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore as any,
        url: config.getOrThrow('REDIS_URL'),
        ttl: config.getOrThrow('CACHE_TTL'),
      }),
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      sortSchema: true,
      playground: true, //process.env.NODE_ENV === Environment.DEV,
      plugins: [
        // ApolloServerPluginLandingPageLocalDefault(),
        // ApolloServerPluginInlineTrace(),
      ],
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        orphanedTypes: [],
        // numberScalarMode: 'integer',
      },
      formatError:
        process.env.NODE_ENV == Environment.PROD
          ? (error: GraphQLError) => {
              const graphQLFormattedError: GraphQLFormattedError = {
                message:
                  // @ts-expect-error
                  error?.extensions?.exception?.response?.message ||
                  error?.message,
              };
              return graphQLFormattedError;
            }
          : (error: GraphQLError) => error,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.getOrThrow('MONGO_URL'),
      }),
    }),
    // WinstonModule.forRoot({
    //   exitOnError: false,
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.colorize(),
    //     winston.format.simple(),
    //   ),
    //   rejectionHandlers: [
    //     new winston.transports.File({
    //       dirname: join(__dirname, '..', 'logs'),
    //       filename: 'rejections.log',
    //     }),
    //   ],
    //   exceptionHandlers: [
    //     new winston.transports.File({
    //       dirname: join(__dirname, '..', 'logs'),
    //       filename: 'exceptions.log',
    //     }),
    //   ],
    //   transports: [
    //     new winston.transports.Console({
    //       handleExceptions: true,
    //       format: winston.format.combine(
    //         winston.format.colorize(),
    //         winston.format.simple(),
    //       ),
    //     }),
    //     new winston.transports.File({
    //       dirname: join(__dirname, '..', 'logs'),
    //       filename: 'combined.log',
    //     }),
    //   ],
    // }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 30,
      },
    ]),
    AuthModule,
    BaseModule,
    PubSubModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/static/'),
      serveStaticOptions: { index: false },
    }),
  ],
  controllers: [],
  providers: [
    DateScalar,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
