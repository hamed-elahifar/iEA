import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePersonnelInput {
  @IsString()
  @Field()
  firstname: string;

  @IsString()
  @Field()
  lastname: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  nationalNumber: string;

  @IsString()
  @Field()
  personnelId: string;

  @IsString()
  @Field()
  position: string;

  @Field()
  company: string;
}
