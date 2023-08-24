import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUnitInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field()
  @IsString()
  supervisor: string;

  @Field()
  @IsString()
  company: string;
}
