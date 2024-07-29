import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateCompanyInput {
  @ApiProperty({ description: 'The name of the company' })
  @IsString()
  @Field()
  name: string;

  @ApiProperty({ description: 'The mission of the company', required: false })
  @IsOptional()
  @Field({ nullable: true })
  mission?: string;

  @ApiProperty({ description: 'The vision of the company', required: false })
  @IsOptional()
  @Field({ nullable: true })
  vision?: string;

  @ApiProperty({ description: 'Child companies', type: [String], required: false })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  children?: string[];

  @ApiProperty({ description: 'This field should be empty', required: false })
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'this field should be empty',
  })
  company?: string;
}
