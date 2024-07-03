import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Job as Entity, JobDocument as EntityDocument } from './job.model';
import { CreateJobInput as CreateInput } from './dto/create-job.input';
import { JobRepository } from './job.repository';
import { UpdateJobInput as UpdateInput } from './dto/update-job.input';
import { Company, CompanyRepository } from '../companies';

@Injectable()
export class JobService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly repository: JobRepository,
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
