import { Field, InputType } from '@nestjs/graphql';
import { Type } from '../activity.model';
import { IsString } from 'class-validator';

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
  @Field()
  job: string;

  @IsString()
  @Field()
  company: string;
}
