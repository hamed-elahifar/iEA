import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HashingService } from './hashing.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;
  let configService: ConfigService;
  let hashingService: HashingService;

  const mockUser = {
    id: 'someId',
    username: 'testUser',
    password: 'hashedPassword',
    company: 'testCompany',
    roles: ['user'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mockSecret'),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return tokens', async () => {
      const signupDto = { username: 'newUser', password: 'password123' };
      jest.spyOn(userModel, 'create').mockResolvedValue(mockUser as any);

      const result = await authService.signup(signupDto);

      expect(result).toHaveProperty('accessToken');
      expect(userModel.create).toHaveBeenCalledWith({
        ...signupDto,
        password: 'hashedPassword',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const signupDto = { username: 'existingUser', password: 'password123' };
      jest.spyOn(userModel, 'create').mockRejectedValue({ code: 11000 });

      await expect(authService.signup(signupDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return tokens if credentials are valid', async () => {
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      const loginDto = { username: 'testUser', password: 'password123' };
      const result = await authService.login(loginDto);
      expect(result).toHaveProperty('accessToken');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      } as any);
      const loginDto = { username: 'nonexistentUser', password: 'password123' };
      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      jest.spyOn(hashingService, 'compare').mockResolvedValueOnce(false);
      const loginDto = { username: 'testUser', password: 'wrongPassword' };
      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('generateToken', () => {
    it('should generate and return an access token', async () => {
      const payload = { id: 'userId', username: 'testUser', company: 'testCompany', roles: ['user'] };
      const result = await authService.generateToken(payload);
      expect(result).toHaveProperty('accessToken');
      expect(jwtService.signAsync).toHaveBeenCalledWith(payload, expect.any(Object));
    });
  });
});
