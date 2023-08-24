import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Personnel } from '../personnels/personnel.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Unit')
@Schema({ timestamps: true })
export class Unit extends Document {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field(() => Personnel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Personnel.name })
  supervisor: Personnel;

  @Field(() => Company)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: Company;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
