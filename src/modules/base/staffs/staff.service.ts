import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from './staff.model';
import { CreateStaffInput } from './dto/create-staff.input';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name)
    private readonly staffModel: Model<Staff>,
  ) {}

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.staffModel
        .find()
        .select(select)
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne({ id, select }): Promise<Staff> {
    const user = await this.staffModel
      .findOne({ _id: id })
      .select(select)
      // .populate(['company'])
      .exec();
    if (!user) {
      throw new NotFoundException(`${Staff.name} #${id} not found`);
    }
    return user;
  }

  async create(createStaffInput: CreateStaffInput) {
    const staff = new this.staffModel(createStaffInput);
    return staff.save();
  }
}
