import { Type } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Selected } from '../decorators/selected.decorator';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverClass {
    constructor(private readonly service: T) {}

    @Mutation((returns) => classRef, {
      name: `create${classRef.name}`,
      nullable: true,
    })
    async create(
      @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
    ) {
      return this.service.create(createCompanyInput);
    }

    @Query((returns) => classRef, {
      name: `get${classRef.name}`,
      nullable: true,
    })
    async findOne(
      @Args('id', { type: () => ID }) id: string,
      @Selected() select,
    ) {
      return this.service.findOne({ id, select });
    }

    @Query((returns) => [classRef], {
      name: `getAll${classRef.name}`,
      nullable: true,
    })
    async findAll(
      @Args('PaginationArgs') paginationArgs: PaginationArgs,
      @Selected() select,
    ) {
      return this.service.findAll({ select });
    }

    @Mutation((returns) => classRef, { name: `update${classRef.name}` })
    async update(
      @Args('id', { type: () => ID }) id: string,
      @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
    ) {
      return this.service.update(id, updateCompanyInput);
    }

    @Mutation((returns) => classRef, { name: `remove${classRef.name}` })
    async remove(@Args('id', { type: () => ID }) id: string) {
      return this.service.remove(id);
    }
  }
  return BaseResolverClass;
}
