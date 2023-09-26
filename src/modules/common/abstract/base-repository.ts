import { Document, FilterQuery, Model } from 'mongoose';

export abstract class BaseRespository<T extends Document> {
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
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async findAll(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
  ): Promise<T[] | null> {
    return this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
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

  async remove(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(entityFilterQuery);
    return result.deletedCount >= 1;
  }
}
