import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Holding as Entity,
  HoldingDocument as EntityDocument,
} from './holding.model';
import { CreateHoldingInput as CreateInput } from './dto/create-holding.input';
import { HoldingRepository } from './holding.repository';
import { UpdateHoldingInput as UpdateInput } from './dto/update-holding.input';

@Injectable()
export class HoldingService {
  constructor(private readonly repository: HoldingRepository) {}

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
    return this.repository.findAll({}, select);
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
