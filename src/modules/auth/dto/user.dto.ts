import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  username: string;

  @Exclude() //  @TODO: not working if only select Exclude fileds
  password: string;
}
