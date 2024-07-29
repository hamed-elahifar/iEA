import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@InputType()
export class CreateStaffInput {
  @ApiProperty({ description: 'The username of the staff' })
  @IsString()
  @Field()
  username: string;

  @ApiProperty({ description: 'The first name of the staff', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  firstname?: string;

  @ApiProperty({ description: 'The last name of the staff', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastname?: string;

  @ApiProperty({ description: 'The password for the staff account', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password?: string;

  @ApiProperty({ description: 'The email address of the staff', required: false })
  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @ApiProperty({ description: 'The phone number of the staff', required: false })
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  phone?: string;

  @ApiProperty({ description: 'The national number of the staff', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nationalNumber?: string;

  @ApiProperty({ description: 'The staff ID', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  staffId?: string;

  @ApiProperty({ description: 'The position of the staff', required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  position?: string;

  @ApiProperty({ description: 'The company the staff belongs to' })
  @IsString()
  @Field()
  company: string;

  @ApiProperty({ description: 'The department of the staff', required: false })
  @IsString()
  @IsOptional()
  @Field()
  department?: string
}
