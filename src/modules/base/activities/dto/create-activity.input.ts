import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../enums/group-type.unum';

@InputType()
export class CreateActivityInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @Field(() => String)
  type: TypeEnum;

  @IsString()
  @IsOptional()
  @Field()
  position?: string;

  @IsString()
  @Field()
  company: string;
}
