import { BaseRepository } from '../../common/abstract/base-repository';
import { Company, CompanyDocument } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(@InjectModel(Company.name) companyModel: Model<CompanyDocument>) {
    super(companyModel);
  }
}
