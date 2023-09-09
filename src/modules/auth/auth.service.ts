import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashingSerivce } from './hashing.service';
import { LoginUserDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { Staff } from '../base/staffs/staff.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Staff.name) private readonly userModel: Model<Staff>,
    private readonly hashingService: HashingSerivce,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    try {
      const user = new this.userModel(signUpUserDto);
      return await user.save();
    } catch (error) {
      console.log(error);
      throw new ConflictException();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ phone: loginUserDto.phone });

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.phone,
        name: user.name,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.ttl,
      },
    );

    return { accessToken };
  }
}
