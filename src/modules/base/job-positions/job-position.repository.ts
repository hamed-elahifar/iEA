import { BaseRepository } from '../../common/generic/base-repository';
import {
  JobPosition,
  JobPositionDocument as EntityDocument,
} from './job-position.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobPositionRepository extends BaseRepository<EntityDocument> {
  constructor(@InjectModel(JobPosition.name) model: Model<EntityDocument>) {
    super(model);
  }
}
