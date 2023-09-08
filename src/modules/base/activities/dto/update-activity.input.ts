import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../enums/group-type.unum';

@InputType()
export class UpdateActivityInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  type?: TypeEnum;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;
}
