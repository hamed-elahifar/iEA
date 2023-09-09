import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './department.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
  ) {}

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.departmentModel
        .find()
        .select(select)
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne({ id, select }): Promise<Department> {
    const result = await this.departmentModel
      .findOne({ _id: id })
      .select(select)
      // .populate(['company'])
      .exec();
    if (!result) {
      throw new NotFoundException(`${Department.name} #${id} not found`);
    }
    return result;
  }

  async create(createDepartmentInput: CreateDepartmentInput) {
    const result = new this.departmentModel(createDepartmentInput);
    return result.save();
  }
}
