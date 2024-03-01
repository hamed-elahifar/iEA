import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Company as Entity,
  CompanyDocument as EntityDocument,
} from './company.model';
import { CreateCompanyInput as CreateInput } from './dto/create-company.input';
import { CompanyRepository } from './company.repository';
import { UpdateCompanyInput as UpdateInput } from './dto/update-company.input';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

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

  async findAll({ select }): Promise<EntityDocument[]> {
    const populateOptions = [{ path: 'holings', select: 'name' }];
    return this.repository.findAll({}, select, populateOptions);
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
