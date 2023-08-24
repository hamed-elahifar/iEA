import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './activity.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<Activity>): Promise<Activity> {
    return this.activityModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<Activity>): Promise<Activity[]> {
    return this.activityModel.findOne(userFilterQuery);
  }

  async create(user: Activity): Promise<Activity> {
    const newUser = new this.activityModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<Activity>,
    user: Partial<Activity>,
  ): Promise<Activity> {
    return this.activityModel.findOneAndUpdate(userFilterQuery, user);
  }

  async delete(userFilterQuery: FilterQuery<Activity>): Promise<Activity> {
    return this.activityModel.findOneAndRemove(userFilterQuery);
  }
}
