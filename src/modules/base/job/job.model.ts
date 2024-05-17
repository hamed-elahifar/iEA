import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Staff } from '../staffs/staff.model';
import { OrganizationLevelEnum } from './enums/organization-level.enum';
import autopopulate from 'mongoose-autopopulate';

export type JobDocument = Job & Document;

@ObjectType('Job')
@Schema({ timestamps: true })
export class Job {
  @Field()
  @Prop()
  title: string;

  @Field(() => Staff)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Staff.name,
    autopopulate: true,
  })
  owner: Staff;

  @Field(() => OrganizationLevelEnum)
  @Prop({ type: String, enum: OrganizationLevelEnum, required: true })
  organizationLevel: OrganizationLevelEnum;

  @Field(() => Company)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    autopopulate: true,
  })
  company: Company;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.plugin(autopopulate);

JobSchema.index({ title: 1, company: -1 }, { unique: true }); // 1 is ascending, -1 is descending
