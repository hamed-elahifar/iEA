import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from './generic.repository';

@Injectable()
export abstract class GenericService<T extends Document> {
  protected repository: GenericRepository<T>;

  constructor(model: Model<T>) {
    this.repository = new GenericRepository<T>(model);
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.repository.create(entity);
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.repository.update(id, entity);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
