import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateDepartmentInput {
  @ApiProperty({ description: 'The title of the department' })
  @Field()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the department', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The supervisor of the department', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  supervisor: string;

  @ApiProperty({ description: 'The parent department', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  parent?: string;

  @ApiProperty({ description: 'The child departments', type: [CreateDepartmentInput], required: false })
  @Field((type) => CreateDepartmentInput, { nullable: true })
  @IsArray()
  @IsOptional()
  children?: CreateDepartmentInput[];

  @ApiProperty({ description: 'The company associated with the department' })
  @Field()
  @IsString()
  company: string;
}
