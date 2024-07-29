import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateStaffInput {
  @ApiProperty({ required: false, description: 'Staff first name' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstname?: string;

  @ApiProperty({ required: false, description: 'Staff last name' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastname?: string;

  @ApiProperty({ required: false, description: 'Staff password' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password?: string;

  @ApiProperty({ required: false, description: 'Staff national number' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nationalNumber?: string;

  @ApiProperty({ required: false, description: 'Staff ID' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  staffId?: string;

  @ApiProperty({ required: false, description: 'Staff position' })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;

  @ApiProperty({ required: true, description: 'Staff department' })
  @IsString()
  @IsOptional()
  @Field()
  department: string
}
