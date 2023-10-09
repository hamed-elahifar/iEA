import { Injectable } from '@nestjs/common';
import { IBaseService } from '../interfaces/base-service.interface';
import { BaseRepository } from './base-repository';
import { Document, FilterQuery } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async create(createEntityData: T): Promise<T> {
    return this.repository.create(createEntityData);
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T | null> {
    return this.repository.findOne(entityFilterQuery, projection);
  }

  async findAll(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T[] | null> {
    return this.repository.findAll(entityFilterQuery, projection);
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: unknown,
  ): Promise<T | null> {
    return this.repository.update(entityFilterQuery, updateEntityData);
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<Boolean> {
    return this.repository.delete(entityFilterQuery);
  }
}
