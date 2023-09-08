import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePersonnelInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstname?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastname?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nationalNumber?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  personnelId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;
}
