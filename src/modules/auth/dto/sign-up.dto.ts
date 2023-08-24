import { IsString } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;
}
