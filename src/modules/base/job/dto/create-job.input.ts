import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Post } from '../post.model';

@InputType()
export class CreateJobInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  department: string;

  @IsString()
  @Field()
  grading: string;

  @IsString()
  @Field()
  company: string;

  // @Field(() => [Post])
  // posts: Post[];
}
