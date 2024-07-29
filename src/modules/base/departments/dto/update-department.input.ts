import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateDepartmentInput {
  @ApiProperty({ description: 'The title of the department', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the department', required: false })
  @Field({ nullable: true })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The supervisor of the department', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  supervisor?: string;
}
