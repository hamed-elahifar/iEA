import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Staff as Entity,
  StaffDocument as EntityDocument,
} from './staff.model';
import { CreateStaffInput as CreateInput } from './dto/create-staff.input';
import { UpdateStaffInput as UpdateInput } from './dto/update-staff.input';
import { StaffRepository } from './staff.repository';
import { Company, CompanyRepository } from '../companies';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyRepository: CompanyRepository,
    private readonly repository: StaffRepository,
  ) {}

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
