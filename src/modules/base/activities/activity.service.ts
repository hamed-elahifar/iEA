import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Activity as Entity,
  ActivityDocument as EntityDocument,
} from './activity.model';
import { CreateActivityInput as CreateInput } from './dto/create-activity.input';
import { UpdateActivityInput as UpdateInput } from './dto/update-activity.input';
import { ActivityRepository } from './activity.repository';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(private readonly repository: ActivityRepository) {}

  async create(createInput: CreateInput): Promise<EntityDocument> {
    try {
      return this.repository.create(createInput);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Already Exists');
      }
      throw error;
    }
  }

  async findOne(
    entityFilterQuery: FilterQuery<Entity>,
    projection: string[],
  ): Promise<EntityDocument> {
    return this.repository.findOne(entityFilterQuery, projection);
  }

  async findAll({ select, where, pagination }): Promise<EntityDocument[]> {
    return this.repository.findAll(where, select, pagination);
  }

  async update(id, attrs: UpdateInput): Promise<EntityDocument> {
    // @TODO may be we should find it first
    const result = await this.repository.update({ _id: id }, { $set: attrs });

    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }

    return result;
  }

  async delete(id: string) {
    // @TODO may be we should find it first
    return this.repository.delete({ id });
  }
}
