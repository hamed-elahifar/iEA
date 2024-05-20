import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TypeEnum } from './enums/group-type.unum';
import { Job } from '../job/job.model';
import autopopulate from 'mongoose-autopopulate';

export type ActivityDocument = Activity & Document;

@ObjectType('Activity')
@Schema({ timestamps: true })
export class Activity {
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

  @Field(() => Job)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Job.name,
    autopopulate: true,
  })
  job?: Job;

  @Field(() => Company)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    autopopulate: true,
  })
  company: Company;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
ActivitySchema.plugin(autopopulate);

ActivitySchema.index({ title: 1, company: 1 }, { unique: true });
ActivitySchema.index({ job: 1 });
