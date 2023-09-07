import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Personnel } from './personnel.model';
import { CreatePersonnelInput } from './dto/create-personnel.input';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectModel(Personnel.name)
    private readonly personnelModel: Model<Personnel>,
  ) {}

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.personnelModel
        .find()
        .select(select)
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne({ id, select }): Promise<Personnel> {
    const user = await this.personnelModel
      .findOne({ _id: id })
      .select(select)
      // .populate(['company'])
      .exec();
    if (!user) {
      throw new NotFoundException(`${Personnel.name} #${id} not found`);
    }
    return user;
  }

  async create(createPersonnelInput: CreatePersonnelInput) {
    const personnel = new this.personnelModel(createPersonnelInput);
    return personnel.save();
  }
}
