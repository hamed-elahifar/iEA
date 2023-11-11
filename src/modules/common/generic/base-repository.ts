import { Document, FilterQuery, Model } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData) as T;
    return entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery)
      .select(projection)
      .exec();
  }

  async findAll(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery).select(projection).exec();
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: unknown,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(entityFilterQuery);
    return result.deletedCount >= 1;
  }
}
