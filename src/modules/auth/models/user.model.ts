import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
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

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});
