import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../common/enums/user-role.enum'; 

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: [String, [String]], enum: Object.values(UserRoleEnum) })
  roles: string | string[];

  @Prop({})
  company: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});
