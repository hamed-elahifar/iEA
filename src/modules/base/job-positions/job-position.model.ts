import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Personnel } from '../personnels/personnel.model';

export type JobPositionDocument = JobPosition & Document;

@ObjectType('JobPosition')
@Schema({ timestamps: true })
export class JobPosition extends Document {
  @Field()
  @Prop()
  title: string;

  @Field(() => Personnel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Personnel.name })
  owner: Personnel;

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

export const JobPositionSchema = SchemaFactory.createForClass(JobPosition);
JobPositionSchema.index({ title: 1, company: -1 }, { unique: true }); // 1 is ascending, -1 is descending
