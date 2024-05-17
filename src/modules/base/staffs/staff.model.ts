import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import autopopulate from 'mongoose-autopopulate';

export type StaffDocument = Staff & Document;

@ObjectType('Staff')
@Schema({ timestamps: true })
export class Staff {
  @Field()
  _id?: string;

  @Field()
  @Prop({ required: false })
  username: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  firstname?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  lastname?: string;

  @Field({ nullable: true })
  @Prop({ select: false, required: false })
  password?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  email?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  nationalNumber?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  personalID?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  phone?: string;

  @Field({ nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Job.name won't work,
    autopopulate: true,
  })
  job: string; // Job won't work

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

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
StaffSchema.plugin(autopopulate);

StaffSchema.index({ phone: 1, company: 1 }, { unique: true }); // 1 is ascending, -1 is descending
StaffSchema.index({ nationalNumber: 1, company: 1 }, { unique: true });
StaffSchema.index({ username: 1, company: 1 }, { unique: true });
StaffSchema.index({ email: 1, company: 1 }, { unique: true });
