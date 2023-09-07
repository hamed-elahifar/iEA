import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityInput } from './dto/create-activity.input';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from './activity.model';
import { Model } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<Activity>,
  ) {}

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.activityModel
        .find()
        .select(select)
        // .skip(offset)
        // .limit(limit)
        // .populate(['company'])
        .exec()
    );
  }

  async findOne({ id, select }): Promise<Activity> {
    const user = await this.activityModel
      .findOne({ _id: id })
      .select(select)
      // .populate(['company'])
      .exec();
    if (!user) {
      throw new NotFoundException(`${Activity.name} #${id} not found`);
    }
    return user;
  }

  async create(createActivityInput: CreateActivityInput) {
    const activity = new this.activityModel(createActivityInput);
    return activity.save();
  }
}
