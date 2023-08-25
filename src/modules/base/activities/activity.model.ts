import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Position } from '../positions/position.model';
import { Company } from '../companies/company.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TypeEnum } from './enums/group-type.unum';

export type ActivityDocument = Activity & Document;

@ObjectType('Activity')
@Schema({ timestamps: true })
export class Activity extends Document {
  @Field(() => ID, { nullable: true, description: '' })
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop()
  description?: string;

  @Field()
  @Prop({ type: String, enum: TypeEnum, required: true })
  type: TypeEnum;

  @Field(() => Position)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Position.name,
  })
  position?: Position;

  @Field(() => Company)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
  })
  company: Company;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
