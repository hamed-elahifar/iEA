import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly hashingService: HashingService,
  ) { }

  async signup(dto: AuthDto): Promise<Tokens> {
    try {
      const hashedPassword = await this.hashingService.hash(dto.password);
      const user = await this.userModel.create({
        ...dto,
        password: hashedPassword,
      });
  
      const token = await this.generateToken({
        id: user.id,
        username: user.username,
        company: user.company,
      });
  
      return token;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.userModel
      .findOne({
        username: dto.username,
      })
      .select('username password email company roles');

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isEqual = await this.hashingService.compare(
      dto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = await this.generateToken({
      id: user.id,
      username: user.username,
      company: user.company,
      roles: user.roles,
    });

    return token;
  }

  async generateToken(payload: JwtPayload): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '30d',
    });

    return { accessToken };
  }
}
