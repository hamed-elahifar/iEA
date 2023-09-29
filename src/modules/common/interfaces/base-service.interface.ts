import { FilterQuery } from 'mongoose';

export interface IBaseService<T> {
  create(entity: T): Promise<T>;

  findOne(entityFilterQuery: FilterQuery<T>, projection?: string[]): Promise<T>;

  findAll(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T[] | null>;

  update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: unknown,
  ): Promise<T | null>;

  delete(entityFilterQuery: FilterQuery<T>): Promise<Boolean>;
}
