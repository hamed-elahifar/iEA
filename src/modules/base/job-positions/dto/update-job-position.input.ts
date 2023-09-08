import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateJobPositionInput {
  @IsString()
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @Field({ nullable: true })
  unit?: string;

  @IsOptional()
  @Field({ nullable: true })
  supervisor?: string;
}
