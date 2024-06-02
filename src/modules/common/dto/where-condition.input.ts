import { Field, InputType, Scalar } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import JSON from 'graphql-type-json';

@InputType()
@Scalar('JSON', (type) => Object)
export class WhereCondition {
  @IsOptional()
  @Field(() => JSON)
  where?: any;
}
