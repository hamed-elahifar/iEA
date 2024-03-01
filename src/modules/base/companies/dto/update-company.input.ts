import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCompanyInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  mission?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  vision: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  holding?: string;
}
