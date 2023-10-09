import { Model, Document } from 'mongoose';

export abstract class GenericRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(entity: Partial<T>): Promise<T> {
    const createdEntity = new this.model(entity);
    return createdEntity.save();
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
