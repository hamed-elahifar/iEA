import { Field, Int, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive, Min, Max } from 'class-validator';

@InputType()
export class PaginationArgs {
  @IsOptional()
  @IsPositive()
  @Field((type) => Int, { nullable: true, defaultValue: 10 })
  @Min(1)
  @Max(50)
  limit?: number;

  @IsOptional()
  // @IsPositive()
  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  @Min(0)
  offset?: number;
}
