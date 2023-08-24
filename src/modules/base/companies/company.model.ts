import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType('Company')
@Schema({ timestamps: true })
export class Company extends Document {
  @Prop()
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
