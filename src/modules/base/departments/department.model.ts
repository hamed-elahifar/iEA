import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Staff } from '../staffs/staff.model';
import { Field, ObjectType } from '@nestjs/graphql';
import autopopulate from 'mongoose-autopopulate';

export type DepartmentDocument = Department & Document;

@ObjectType('Department')
@Schema({ timestamps: true })
export class Department {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field(() => Department)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    autopopulate: true,
  })
  parent: Department;

  @Field(() => Staff)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Staff.name,
    autopopulate: true,
  })
  supervisor: Staff;

  @Field(() => Staff)
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Staff.name,
    autopopulate: true,
  })
  members: [Staff];

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

export const DepartmentSchema = SchemaFactory.createForClass(Department);
DepartmentSchema.plugin(autopopulate);

DepartmentSchema.index({ name: 1, company: 1 }, { unique: true });
