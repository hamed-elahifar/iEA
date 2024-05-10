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
import { FilterQuery } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  async create(createInput: CreateInput): Promise<EntityDocument> {
    const exist = await this.findOne({
      entityFilterQuery: { name: createInput.name },
    });

    if (exist) {
      throw new ConflictException(`${Entity.name} aleady exist`);
    }

    // @TODO
    // loop all childeren ID and check if they are exist

    return this.repository.create(createInput);
  }

  async findOne(
    entityFilterQuery: FilterQuery<Entity>,
    projection?: string[],
  ): Promise<EntityDocument> {
    return this.repository.findOne(entityFilterQuery, projection);
  }

  async findAll(
    entityFilterQuery: FilterQuery<Entity> = {},
    projection?: string[],
  ): Promise<EntityDocument[]> {
    return this.repository.findAll(entityFilterQuery, projection);
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
