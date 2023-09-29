import { BaseRepository } from '../../common/abstract/base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Activity } from './activity.model';

@Injectable()
export class ActivityRepository extends BaseRepository<Activity> {
  constructor(@InjectModel(Activity.name) activityModel: Model<Activity>) {
    super(activityModel);
  }
}
