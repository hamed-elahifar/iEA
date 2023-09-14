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
import { User } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
    const user = await this.userModel
      .findOne({
        username: loginUserDto.username,
      })
      .select('password');

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isEqual = await this.hashingService.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Unauthorized');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.username,
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

  async findByUsername(username) {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
