import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { TypeEnum } from '../enums/group-type.unum';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateActivityInput {
  @ApiProperty({ description: 'The title of the activity' })
  @IsString()
  @Field()
  title: string;

  @ApiProperty({ description: 'The description of the activity', required: false })
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @ApiProperty({ description: 'The type of the activity', enum: TypeEnum })
  @IsString()
  @Field(() => String)
  type: TypeEnum;

  @ApiProperty({ description: 'The position related to the activity', required: false })
  @IsString()
  @IsOptional()
  @Field()
  position?: string;

  @ApiProperty({ description: 'The company associated with the activity' })
  @IsString()
  @Field()
  company: string;
}
