import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Unit } from '../units/unit.model';
import { Personnel } from '../personnels/personnel.model';

export type PositionDocument = Position & Document;

@ObjectType('Position')
@Schema({ timestamps: true })
export class Position extends Document {
  @Prop()
  @Field()
  title: string;

  @Field(() => Unit)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Unit.name })
  unit: Unit;

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

  @Field(() => Date)
  deletedAt: Date;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
