import { BaseRepository } from '../../common/generic/base-repository';
import {
  Company,
  Company as Entity,
  CompanyDocument as EntityDocument,
} from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends BaseRepository<EntityDocument> {
  constructor(
    @InjectModel(Entity.name) model: Model<EntityDocument>,
    @InjectModel(Company.name) companyModel: Model<Company>,
  ) {
    super(model, companyModel);
  }
}
