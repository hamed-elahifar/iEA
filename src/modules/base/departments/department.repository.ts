import { BaseRepository } from '../../common/generic/base-repository';
import {
  Department,
  DepartmentDocument as EntityDocument,
} from './department.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentRepository extends BaseRepository<EntityDocument> {
  constructor(@InjectModel(Department.name) model: Model<EntityDocument>) {
    super(model);
  }
}
