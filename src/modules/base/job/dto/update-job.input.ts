import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Post } from '../post.model';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateJobInput {
  @ApiProperty({ description: 'The title of the job', required: false })
  @IsString()
  @Field({ nullable: true })
  title?: string;

  @ApiProperty({ description: 'The department of the job', required: false })
  @IsOptional()
  @Field({ nullable: true })
  department?: string;

  @ApiProperty({ description: 'The grading of the job', required: false })
  @IsOptional()
  @Field({ nullable: true })
  grading?: string;

  // @IsOptional()
  // @Field({ nullable: true })
  // posts: Post[];
}
