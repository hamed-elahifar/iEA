import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType('Company')
@Schema({ timestamps: true })
export class Company extends Document {
  @Field()
  _id: string;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop()
  mission: string;

  @Field()
  @Prop()
  vision: string;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
