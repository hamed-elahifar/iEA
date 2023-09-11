import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up.dto';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorators';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Auth(AuthType.None)
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body()
    loginUserDto: LoginUserDto,
  ) {
    const accessToken = await this.authService.login(loginUserDto);

    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return accessToken;
  }
}
