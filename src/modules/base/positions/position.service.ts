import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position } from './position.model';
import { CreatePositionInput } from './dto/create-position.input';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position.name)
    private readonly positionModel: Model<Position>,
  ) {}

  findAll() {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.positionModel
        .find()
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne(id: string): Promise<Position> {
    const result = await this.positionModel
      .findOne({ _id: id })
      // .populate(['company'])
      .exec();
    if (!result) {
      throw new NotFoundException(`${Position.name} #${id} not found`);
    }
    return result;
  }

  async create(createPositionInput: CreatePositionInput) {
    const result = new this.positionModel(createPositionInput);
    return result.save();
  }
}
