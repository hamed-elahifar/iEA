import { Type } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Document } from 'mongoose';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverClass {
    constructor(private readonly service: T) {}

    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return this.service.find({});
    }
  }
  return BaseResolverClass;
}
