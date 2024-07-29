import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Post } from '../post.model';
import { OrganizationLevelEnum } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateJobInput {
  @ApiProperty({ description: 'The title of the job' })
  @IsString()
  @Field()
  title: string;

  @ApiProperty({ description: 'The department of the job' })
  @IsString()
  @Field()
  department: string;

  @ApiProperty({ description: 'The grading of the job' })
  @IsString()
  @Field()
  grading: string;

  @ApiProperty({ description: 'The company offering the job' })
  @IsString()
  @Field()
  company: string;
  
  @ApiProperty({ description: 'The organization level of the job', enum: OrganizationLevelEnum })
  @IsString()
  @Field()
  organizationLevel: OrganizationLevelEnum

  // @Field(() => [Post])
  // posts: Post[];
}
