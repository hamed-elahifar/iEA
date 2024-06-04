import { BaseRepository } from '../../common/generic/base-repository';
import {
  Department as Entity,
  DepartmentDocument as EntityDocument,
} from './department.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Company } from '../companies';

@Injectable()
export class DepartmentRepository extends BaseRepository<EntityDocument> {
  constructor(
    @InjectModel(Entity.name) model: Model<EntityDocument>,
    @InjectModel(Company.name) companyModel: Model<Company>,
  ) {
    super(model, companyModel);
  }
}
