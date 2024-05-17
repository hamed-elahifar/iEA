import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

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
  supervisor?: string;
}
