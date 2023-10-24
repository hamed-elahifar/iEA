import { Type } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Selected } from '../decorators/selected.decorator';
import { BaseService } from './base-service';
import { PaginationArgs } from '../dto/pagination.input';
import { Document } from 'mongoose';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private readonly service: BaseService<T>) {}

    @Mutation((returns) => classRef, {
      name: `create${classRef.name}`,
      nullable: true,
    })
    async create(@Args(`create${classRef.name}Input`) createInput): Promise<T> {
      return this.service.create(createInput);
    }

    @Query((returns) => classRef, {
      name: `get${classRef.name}`,
      nullable: true,
    })
    async findOne(
      @Args('id', { type: () => ID }) id: string,
      @Selected() select,
    ): Promise<T | null> {
      return this.service.findOne({ id, select });
    }

    @Query((returns) => [classRef], {
      name: `getAll${classRef.name}`,
      nullable: true,
    })
    async findAll(
      @Args('PaginationArgs') paginationArgs: PaginationArgs,
      @Selected() select,
    ): Promise<T[] | null> {
      return this.service.findAll({ select });
    }

    @Mutation((returns) => classRef, { name: `update${classRef.name}` })
    async update(
      @Args('id', { type: () => ID }) id: string,
      @Args(`update${classRef.name}Input`) updateInput,
    ): Promise<T | null> {
      return this.service.update({ id }, updateInput);
    }

    @Mutation((returns) => classRef, { name: `delete${classRef.name}` })
    async delete(@Args('id', { type: () => ID }) id: string): Promise<Boolean> {
      return this.service.delete({ id });
    }
  }
  return BaseResolverHost;
}

// export function BaseResolver<T extends Document & { name: string }>(
// function BaseResolver<T extends Type<unknown>>(classRef: T): any {
//   classRef: T,
// ): any {
//   @Resolver({ isAbstract: true })
//   abstract class BaseResolverClass {

//   }

//   return BaseResolverClass;
// }
