import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  phone: string;

  @Prop({ unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.index({ phone: 1, name: 1 });
