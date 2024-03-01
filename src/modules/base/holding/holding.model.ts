import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HoldingDocument = Holding & Document;

@ObjectType('Holding')
@Schema({ timestamps: true })
export class Holding {
  @Field()
  _id: string;

  @Field()
  @Prop({ unique: true })
  name: string;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}

export const HoldingSchema = SchemaFactory.createForClass(Holding);
