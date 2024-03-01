import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Holding } from '../holding/holding.model';
import autopopulate from 'mongoose-autopopulate';

export type CompanyDocument = Company & Document;

@ObjectType('Company')
@Schema({ timestamps: true })
export class Company {
  @Field()
  _id: string;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  mission: string;

  @Field({ nullable: true })
  @Prop()
  vision: string;

  @Field(() => Holding, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Holding.name,
    autopopulate: true,
  })
  holding: Holding | null;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
CompanySchema.plugin(autopopulate);
