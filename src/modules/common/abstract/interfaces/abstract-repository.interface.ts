import { FilterQuery } from 'mongoose';

export abstract class IGenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract create(entity: Partial<T>): Promise<T>;
  abstract update(id: string, entity: Partial<T>): Promise<T | null>;
  abstract delete(entityFilterQuery: FilterQuery<T>): Promise<Boolean>;
}
