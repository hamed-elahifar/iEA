import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Department as Entity,
  DepartmentDocument as EntityDocument,
} from './department.model';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentInput as CreateInput } from './dto/create-department.input';
import { UpdateDepartmentInput as UpdateInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly repository: DepartmentRepository) {}

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

  async findOne({
    id,
    select,
  }: {
    id: string;
    select?: string[];
  }): Promise<EntityDocument> {
    const entity = await this.repository.findOne({ _id: id }, select);

    if (!entity) {
      throw new NotFoundException(`${Entity.name} #${id} not found`);
    }

    return entity;
  }

  async findAll({ select, where, pagination }): Promise<EntityDocument[]> {
    return this.repository.findAll(where, select, pagination);
  }

  async update(id, attrs: UpdateInput): Promise<EntityDocument> {
    const result = await this.repository.update({ _id: id }, { $set: attrs });

    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }

    return result;
  }

  async delete(id: string) {
    return this.repository.delete({ id });
  }
}
