import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Post } from '../post.model';
import { OrganizationLevelEnum } from '../enums';

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
  
  @IsString()
  @Field()
  organizationLevel: OrganizationLevelEnum

  // @Field(() => [Post])
  // posts: Post[];
}
