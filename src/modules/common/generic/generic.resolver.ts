import { Document, Model } from 'mongoose';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GenericService } from './generic.service';

@Resolver()
export abstract class GenericResolver<T extends Document> {
  protected service: GenericService<T>;

  constructor(model: Model<T>) {
    this.service = new GenericService<T>(model);
  }

  @Query(() => [this.service.getEntityType()], {
    name: `getAll${this.service.getEntityName()}s`,
  })
  async getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Query(() => this.service.getEntityType(), {
    name: `get${this.service.getEntityName()}ById`,
  })
  async getById(@Args('id') id: string): Promise<T | null> {
    return this.service.getById(id);
  }

  @Mutation(() => this.service.getEntityType(), {
    name: `create${this.service.getEntityName()}`,
  })
  async create(@Args('entity') entity: Partial<T>): Promise<T> {
    return this.service.create(entity);
  }

  @Mutation(() => this.service.getEntityType(), {
    name: `update${this.service.getEntityName()}`,
  })
  async update(
    @Args('id') id: string,
    @Args('entity') entity: Partial<T>,
  ): Promise<T | null> {
    return this.service.update(id, entity);
  }

  @Mutation(() => Boolean, { name: `delete${this.service.getEntityName()}` })
  async delete(@Args('id') id: string): Promise<boolean> {
    await this.service.delete(id);
    return true;
  }
}
