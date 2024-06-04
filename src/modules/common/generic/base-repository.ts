import { NotFoundException } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  UpdateQuery,
} from 'mongoose';
import { Company } from 'src/modules/base/companies';

export abstract class BaseRepository<T extends Document> {
  constructor(
    protected readonly entityModel: Model<T>,
    protected readonly companyModel: Model<Company>,
  ) {}

  async create(createEntityData: unknown & { company?: string }): Promise<T> {
    if (createEntityData.company) {
      const company = await this.companyModel.findOne({
        _id: createEntityData.company,
      });
      if (!company) {
        throw new NotFoundException(`${Company.name} not found`);
      }
    }

    const entity = new this.entityModel(createEntityData) as T;
    return entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: string[],
    populateOptions?: PopulateOptions,
  ): Promise<T | null> {
    let query;

    query = this.entityModel.findOne(entityFilterQuery);

    if (projection) {
      query = query.select(projection);
    }

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    return query.exec();
  }

  async findAll(
    entityFilterQuery: FilterQuery<T> = {},
    projection?: string[],
    pagination?: { limit?: number; offset?: number },
    populateOptions?: string | PopulateOptions | (string | PopulateOptions)[],
  ): Promise<T[] | null> {
    let query;

    query = this.entityModel.find(entityFilterQuery);

    if (projection) {
      query = query.select(projection);
    }

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    if (pagination.limit) {
      query = query.limit(pagination.limit);
    }

    if (pagination.offset) {
      query = query.skip(pagination.offset);
    }

    return query.exec();
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>,
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
