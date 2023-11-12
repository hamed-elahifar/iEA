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
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createInput: CreateInput): Promise<EntityDocument> {
    try {
      return this.companyRepository.create(createInput);
    } catch (error) {
      if ((error.code = 11000)) {
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
    const entity = await this.companyRepository.findOne({ _id: id }, select);

    if (!entity) {
      throw new NotFoundException(`${Entity.name} #${id} not found`);
    }

    return entity;
  }

  async findAll({ select }): Promise<EntityDocument[]> {
    return this.companyRepository.findAll({}, select);
  }

  async update(id, attrs: UpdateInput): Promise<EntityDocument> {
    const result = await this.companyRepository.update(
      { _id: id },
      { $set: attrs },
    );

    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }

    return result;
  }

  async delete(id: string) {
    const result = await this.findOne({ id });
    return result.deleteOne();
  }
}
