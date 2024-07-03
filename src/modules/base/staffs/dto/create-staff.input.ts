import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateStaffInput {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstname?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastname?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  phone?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nationalNumber?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  staffId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;

  @IsString()
  @Field()
  company: string;

  @IsString()
  @IsOptional()
  @Field()
  department?: string
}
