import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('Personnel')
@Schema({ timestamps: true })
export class Personnel extends Document {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  password: string;

  @Prop()
  nationalNumber: string;

  @Prop()
  code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position' /* Position.name wont work */,
  })
  position: string; // Position wont work

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: Company;
}

export const PersonnelSchema = SchemaFactory.createForClass(Personnel);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
