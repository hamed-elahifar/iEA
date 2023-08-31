import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  Validate,
  validateSync,
} from 'class-validator';
import { IsNumberOrString } from './string-or-number.validator';
import { Environment } from '../enums/environments.enum';

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  REDIS_URL: string;

  @IsString()
  MONGO_URL: string;

  @IsBoolean()
  MONGO_DEBUG: boolean;

  @IsNumber()
  CACHE_TTL: number;

  @IsDefined()
  @Validate(IsNumberOrString)
  JWT_SECRET: number | string;

  @IsString()
  JWT_TOKEN_AUDIENCE: string;

  @IsString()
  JWT_TOKEN_ISSUER: string;

  @IsNumber()
  JWT_ACCESS_TOKEN_TTL: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
