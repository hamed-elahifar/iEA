import { BaseRespository } from '../../common/abstract/base-repository';
import { Company } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository extends BaseRespository<Company> {
  constructor(@InjectModel(Company.name) companyModel: Model<Company>) {
    super(companyModel);
  }
}
