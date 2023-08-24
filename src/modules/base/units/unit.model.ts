import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Personnel } from '../personnels/personnel.model';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('Unit')
@Schema({ timestamps: true })
export class Unit extends Document {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Personnel.name })
  supervisor: Personnel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: Company;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
