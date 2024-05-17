import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateJobInput {
  @IsString()
  @Field()
  title: string;

  @Field()
  department: string;

  @Field()
  grading: string;

  @Field()
  company: string;
}
