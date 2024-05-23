import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Post } from '../post.model';

@InputType()
export class UpdateJobInput {
  @IsString()
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @Field({ nullable: true })
  department?: string;

  @IsOptional()
  @Field({ nullable: true })
  grading?: string;

  // @IsOptional()
  // @Field({ nullable: true })
  // posts: Post[];
}
