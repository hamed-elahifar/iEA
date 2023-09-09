import { Exclude } from 'class-transformer';

export class StaffDto {
  @Exclude()
  password: string;
}
