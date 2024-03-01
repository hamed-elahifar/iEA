import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateHoldingInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;
}
