import { BaseRepository } from '../../common/generic/base-repository';
import { Activity, ActivityDocument as EntityDocument } from './activity.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityRepository extends BaseRepository<EntityDocument> {
  constructor(
    @InjectModel(Activity.name) activityModel: Model<EntityDocument>,
  ) {
    super(activityModel);
  }
}
