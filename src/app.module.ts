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
import { WinstonModule } from 'nest-winston';
import winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV === Environment.DEV,
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
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
      rejectionHandlers: [
        new winston.transports.File({
          dirname: join(__dirname, '..', 'logs'),
          filename: 'rejections.log',
        }),
      ],
      exceptionHandlers: [
        new winston.transports.File({
          dirname: join(__dirname, '..', 'logs'),
          filename: 'exceptions.log',
        }),
      ],
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
        }),
        new winston.transports.File({
          dirname: join(__dirname, '..', 'logs'),
          filename: 'combined.log',
        }),
      ],
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
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
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
