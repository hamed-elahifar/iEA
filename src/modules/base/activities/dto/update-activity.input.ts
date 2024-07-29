import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../enums/group-type.unum';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateActivityInput {
  @ApiProperty({ required: false, description: 'The title of the activity' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @ApiProperty({ required: false, description: 'The description of the activity' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @ApiProperty({ required: false, enum: TypeEnum, description: 'The type of the activity' })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  type?: TypeEnum;


  @ApiProperty({ required: false, description: 'The position of the activity' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;
}
