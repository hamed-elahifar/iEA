import { Module } from '@nestjs/common';
import { BcryptSerive } from './bcrypt.service';
import { HashingSerivce } from './hashing.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { Personnel, PersonnelSchema } from '../base/personnels/personnel.model';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    MongooseModule.forFeature([
      {
        name: Personnel.name,
        schema: PersonnelSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: HashingSerivce,
      useClass: BcryptSerive,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
