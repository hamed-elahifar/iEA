import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ index: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.index({ phone: 1, name: -1 }); // 1 is ascending, -1 is descending
