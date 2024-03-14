import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  supervisor: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  parent?: string;

  @Field()
  @IsString()
  company: string;
}
