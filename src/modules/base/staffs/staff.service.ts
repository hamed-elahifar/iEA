import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Staff as Entity,
  StaffDocument as EntityDocument,
} from './staff.model';
import { CreateStaffInput as CreateInput } from './dto/create-staff.input';
import { UpdateStaffInput as UpdateInput } from './dto/update-staff.input';
import { StaffRepository } from './staff.repository';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Entity.name)
    private readonly staffModel: Model<Entity>,
    private readonly staffRepository: StaffRepository,
  ) {}

  async create(createInput: CreateInput): Promise<EntityDocument> {
    try {
      return this.staffRepository.create(createInput);
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
    const entity = await this.staffRepository.findOne({ _id: id }, select);

    if (!entity) {
      throw new NotFoundException(`${Entity.name} #${id} not found`);
    }

    return entity;
  }

  async findAll({ select }): Promise<EntityDocument[]> {
    return this.staffRepository.findAll({}, select);
  }

  async update(id, attrs: UpdateInput): Promise<EntityDocument> {
    const result = await this.staffRepository.update(
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
