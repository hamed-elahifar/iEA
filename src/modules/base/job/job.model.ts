import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../companies/company.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrganizationLevelEnum } from './enums/organization-level.enum';
import autopopulate from 'mongoose-autopopulate';
import { Post } from './post.model';

export type JobDocument = Job & Document;

@ObjectType('Job')
@Schema({ timestamps: true })
export class Job {
  @Field()
  _id: string;

  @Field()
  @Prop({ type: String })
  title: string;

  @Field(() => OrganizationLevelEnum)
  @Prop({ type: String, enum: OrganizationLevelEnum, required: true })
  organizationLevel: OrganizationLevelEnum;

  @Field()
  @Prop({ type: String })
  grading: string;

  @Field(() => Post)
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post.name,
        autopopulate: true,
      },
    ],
    required: true,
  })
  posts: Post[];

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

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.plugin(autopopulate);

JobSchema.index({ title: 1, company: -1 }, { unique: true });
