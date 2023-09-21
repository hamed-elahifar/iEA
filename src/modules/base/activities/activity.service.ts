import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityInput } from './dto/create-activity.input';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from './activity.model';
import { Model } from 'mongoose';
import { ActivityRepository } from './activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return this.activityRepository.findAll({}, select);
  }

  async findOne({ id, select }): Promise<Activity> {
    const user = await this.activityRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`${Activity.name} #${id} not found`);
    }
    return user;
  }

  async create(createActivityInput: CreateActivityInput) {
    return this.activityRepository.create(createActivityInput);
  }
}
