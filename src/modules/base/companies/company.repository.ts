import { BaseRepository } from '../../common/generic/base-repository';
import { Company, CompanyDocument as EntityDocument } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends BaseRepository<EntityDocument> {
  constructor(@InjectModel(Company.name) model: Model<EntityDocument>) {
    super(model);
  }
}
