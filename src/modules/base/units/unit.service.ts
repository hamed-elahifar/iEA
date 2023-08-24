import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUnitInput } from './dto/create-unit.input';
import { Unit } from './unit.model';

@Injectable()
export class UnitService {
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<Unit>,
  ) {}

  findAll() {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.unitModel
        .find()
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne(id: string): Promise<Unit> {
    const result = await this.unitModel
      .findOne({ _id: id })
      // .populate(['company'])
      .exec();
    if (!result) {
      throw new NotFoundException(`${Unit.name} #${id} not found`);
    }
    return result;
  }

  async create(createUnitInput: CreateUnitInput) {
    const result = new this.unitModel(createUnitInput);
    return result.save();
  }
}
