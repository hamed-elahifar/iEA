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
import { UpdateCompanyInput as UpdateInput } from './dto/update-company.input';
import { CompanyRepository } from './company.repository';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) { }

  async create(createInput: CreateInput): Promise<EntityDocument> {
    const exist = await this.findOne({
      entityFilterQuery: { name: createInput.name },
    });
    if (exist) {
      throw new ConflictException(`${Entity.name} already exists`);
    }

    // @TODO
    // loop all children ID and check if they are exist

    return this.repository.create(createInput);
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

  async update(id, attrs: UpdateInput): Promise<EntityDocument> {
    const result = await this.repository.update({ _id: id }, { $set: attrs });

    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }

    return result;
  }

  async delete(_id: string) {
    return this.repository.delete({ _id });
  }
}
