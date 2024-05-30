import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  title: string;

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

  @Field((type) => CreateDepartmentInput, { nullable: true })
  @IsArray()
  @IsOptional()
  children?: CreateDepartmentInput[];

  @Field()
  @IsString()
  company: string;
}
