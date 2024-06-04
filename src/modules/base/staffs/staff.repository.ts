import { BaseRepository } from '../../common/generic/base-repository';
import {
  Staff as Entity,
  StaffDocument as EntityDocument,
} from './staff.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Company } from '../companies';

@Injectable()
export class StaffRepository extends BaseRepository<EntityDocument> {
  constructor(
    @InjectModel(Entity.name) model: Model<EntityDocument>,
    @InjectModel(Company.name) companyModel: Model<Company>,
  ) {
    super(model, companyModel);
  }
}
