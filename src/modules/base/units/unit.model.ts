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

  @Field(() => Unit)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Unit.name })
  parent: Unit;

  @Field(() => Personnel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Personnel.name })
  supervisor: Personnel;

  @Field(() => Personnel)
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Personnel.name })
  members: [Personnel];

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

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
UnitSchema.index({ name: 1, company: 1 }, { unique: true });
