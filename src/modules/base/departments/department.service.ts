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
import { Company, CompanyRepository } from '../companies';
import { StaffRepository } from '../staffs';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly repository: DepartmentRepository,
    private readonly staffRepository: StaffRepository,
  ) { }

  async create(createInput: CreateInput): Promise<EntityDocument> {
    const company = await this.companyRepository.findOne({
      _id: createInput.company,
    });

    if (!company) {
      throw new NotFoundException(`${Company.name} not found`);
    }

    const exist = await this.repository.findOne({ title: createInput.title, company: createInput.company })
    if (exist) {
      throw new ConflictException(`${Entity.name} aleady exist`)
    }

    const supervisor = await this.staffRepository.findOne({ _id: createInput.supervisor })
    if (!supervisor) {
      throw new NotFoundException(`supervisor not found`);
    }

    return this.repository.create(createInput);
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
