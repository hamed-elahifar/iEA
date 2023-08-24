import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Personnel')
@Schema({ timestamps: true })
export class Personnel extends Document {
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
  code: string;

  @Field()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position' /* Position.name wont work */,
  })
  position: string; // Position wont work

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

export const PersonnelSchema = SchemaFactory.createForClass(Personnel);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
