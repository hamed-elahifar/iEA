import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPosition } from './job-position.model';
import { CreateJobPositionInput } from './dto/create-job-position.input';

@Injectable()
export class JobPositionService {
  constructor(
    @InjectModel(JobPosition.name)
    private readonly jobPositionModel: Model<JobPosition>,
  ) {}

  findAll() {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.jobPositionModel
        .find()
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne(id: string): Promise<JobPosition> {
    const result = await this.jobPositionModel
      .findOne({ _id: id })
      // .populate(['company'])
      .exec();
    if (!result) {
      throw new NotFoundException(`${JobPosition.name} #${id} not found`);
    }
    return result;
  }

  async create(createJobPositionInput: CreateJobPositionInput) {
    const result = new this.jobPositionModel(createJobPositionInput);
    return result.save();
  }
}
