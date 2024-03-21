import { BaseRepository } from '../../common/generic/base-repository';
import {
  Staff as Entity,
  StaffDocument as EntityDocument,
} from './staff.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffRepository extends BaseRepository<EntityDocument> {
  constructor(@InjectModel(Entity.name) companyModel: Model<EntityDocument>) {
    super(companyModel);
  }
}
