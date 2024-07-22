import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, jwtConstants } from './strategies';
import { HashingService } from './hashing.service';
import { BcryptService } from './bcrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class AuthModule { }
