import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateJobPositionInput {
  @IsString()
  @Field()
  title: string;

  @Field()
  unit: string;

  @Field()
  supervisor: string;

  @Field()
  company: string;
}