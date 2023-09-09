import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Staff')
@Schema({ timestamps: true })
export class Staff extends Document {
  @Field()
  _id?: string;

  @Field()
  @Prop()
  firstname: string;

  @Field()
  @Prop()
  lastname: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  nationalNumber: string;

  @Field()
  @Prop()
  personalID: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  phone: string;

  @Field()
  @Prop()
  email: string;

  @Field({ nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosition', // JobPosition.name won't work,
  })
  jobPosition: string; // JobPosition won't work

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

export const StaffSchema = SchemaFactory.createForClass(Staff);
StaffSchema.index({ phone: 1, company: 1 }, { unique: true }); // 1 is ascending, -1 is descending
StaffSchema.index({ nationalNumber: 1, company: 1 }, { unique: true });
StaffSchema.index({ username: 1, company: 1 }, { unique: true });
StaffSchema.index({ email: 1, company: 1 }, { unique: true });
