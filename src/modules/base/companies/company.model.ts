import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@ObjectType('Company')
@Schema({ timestamps: true })
export class Company  {
  @Field()
  _id: string;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  mission: string;

  @Field({ nullable: true })
  @Prop()
  vision: string;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
