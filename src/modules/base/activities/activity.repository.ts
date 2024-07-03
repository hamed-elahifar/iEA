import { BaseRepository } from '../../common/generic/base-repository';
import {
  Activity as Entity,
  ActivityDocument as EntityDocument,
} from './activity.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Company } from '../companies';

@Injectable()
export class ActivityRepository extends BaseRepository<EntityDocument> {
  constructor(
    @InjectModel(Entity.name) model: Model<EntityDocument>,
  ) {
    super(model);
  }
}
