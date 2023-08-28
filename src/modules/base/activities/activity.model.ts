import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TypeEnum } from './enums/group-type.unum';
import { JobPosition } from '../job-positions/job-position.model';

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

  @Field(() => JobPosition)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: JobPosition.name,
  })
  jobPosition?: JobPosition;

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
ActivitySchema.index({ title: 1, company: 1 }, { unique: true });
ActivitySchema.index({ jobPosition: 1 });
