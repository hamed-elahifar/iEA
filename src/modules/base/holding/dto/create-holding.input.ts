import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateHoldingInput {
  @IsString()
  @Field()
  name: string;
}
