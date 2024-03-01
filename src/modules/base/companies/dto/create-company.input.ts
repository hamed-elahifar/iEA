import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  mission?: string;

  @IsOptional()
  @Field({ nullable: true })
  vision?: string;

  @IsOptional()
  @Field({ nullable: true })
  holding?: string;
}
