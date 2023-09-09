import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  supervisor?: string;
}
