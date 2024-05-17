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
  supervisor: string;

  @Field()
  company: string;
}
