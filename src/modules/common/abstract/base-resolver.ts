import { Type } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Selected } from '../decorators/selected.decorator';
import { BaseService } from './base-service';
import { PaginationArgs } from '../dto/pagination.input';
import { Document } from 'mongoose';

// Type<unknown>

export function BaseResolver<T extends Document>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverClass {
    constructor(private readonly service: BaseService<T>) {}

    @Mutation((returns) => classRef, {
      name: `createTEST`,
      nullable: true,
    })
    async create(@Args(`createTESTInput`) createInput): Promise<T> {
      return this.service.create(createInput);
    }

    @Query((returns) => classRef, {
      name: `getTEST`,
      nullable: true,
    })
    async findOne(
      @Args('id', { type: () => ID }) id: string,
      @Selected() select,
    ): Promise<T | null> {
      return this.service.findOne({ id, select });
    }

    @Query((returns) => [classRef], {
      name: `getAllTEST`,
      nullable: true,
    })
    async findAll(
      @Args('PaginationArgs') paginationArgs: PaginationArgs,
      @Selected() select,
    ): Promise<T[] | null> {
      return this.service.findAll({ select });
    }

    @Mutation((returns) => classRef, { name: `updateTEST` })
    async update(
      @Args('id', { type: () => ID }) id: string,
      @Args(`updateTESTInput`) updateInput,
    ): Promise<T | null> {
      return this.service.update({ id }, updateInput);
    }

    @Mutation((returns) => classRef, { name: `deleteTEST` })
    async delete(@Args('id', { type: () => ID }) id: string): Promise<Boolean> {
      return this.service.delete({ id });
    }
  }

  return BaseResolverClass;
}
