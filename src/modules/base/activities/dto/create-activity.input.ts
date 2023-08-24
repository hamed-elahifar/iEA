import { Field, InputType } from '@nestjs/graphql';
import { Type } from '../activity.model';
import { IsOptional, IsString } from 'class-validator';

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
  type: Type;

  @IsString()
  @IsOptional()
  @Field()
  position: string;

  @IsString()
  @Field()
  company: string;
}
