import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Staff } from '../staffs/staff.model';
import autopopulate from 'mongoose-autopopulate';

export type PostDocument = Post & Document;

@ObjectType('Post')
@Schema({ timestamps: true })
export class Post {
  @Field()
  @Prop()
  title: string;

  @Field(() => Staff)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Staff.name,
    autopopulate: true,
    default: null,
  })
  owner: Staff | null;

  @Field(() => Company)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    autopopulate: true,
  })
  company: Company;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('occupied').get(function () {
  return !!this.owner;
});

PostSchema.plugin(autopopulate);

PostSchema.index({ title: 1, company: -1 }, { unique: true });
