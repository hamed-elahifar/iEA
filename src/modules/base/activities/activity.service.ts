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
import { Company, CompanyRepository } from '../companies';

@Injectable()
export class ActivityService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly repository: ActivityRepository,
  ) { }

  async create(createInput: CreateInput): Promise<EntityDocument> {
    const company = await this.companyRepository.findOne({
      _id: createInput.company,
    });

    if (!company) {
      throw new NotFoundException(`${Company.name} not found`);
    }

    try {
      return this.repository.create(createInput);
    } catch (error) {
      if ((error.code = 11000)) {
        throw new ConflictException('Already Exists');
      }
      throw error;
    }
  }

  async findOne(
    entityFilterQuery: FilterQuery<Entity>,
    projection?: string[],
  ): Promise<EntityDocument> {
    return this.repository.findOne(entityFilterQuery, projection);
  }

  async findAll({ select, where, pagination }: { select: string[], where: object, pagination?: object }): Promise<EntityDocument[]> {
    return this.repository.findAll(where, select, pagination);
  }

  async update(_id, attrs: UpdateInput): Promise<EntityDocument> {
    // @TODO may be we should find it first
    const result = await this.repository.update({ _id }, { $set: attrs });

    if (!result) {
      throw new NotFoundException(`${_id} not found`);
    }
    return result;
  }

  async delete(_id: string) {
     // @TODO may be we should find it first
    return this.repository.delete({ _id });
  }
}
