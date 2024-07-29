import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateCompanyInput {
  @ApiProperty({ required: false, description: 'The name of the company' })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @ApiProperty({ required: false, description: 'The mission of the company' })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  mission?: string;

  @ApiProperty({ required: false, description: 'The vision of the company' })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  vision: string;

  @ApiProperty({ required: false, type: [String], description: 'The children of the company' })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  children?: string[];
}
