import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../companies/company.model';
import { Activity } from './activity.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';

@UseGuards(AccessTokenGuard)
@Resolver(() => Activity)
export class ActivityCompanyResolver {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) { }

  @ResolveField('company', () => Company)
  async getCompanyOfActivity(@Parent() activity: Activity) {
    return this.companyModel.findOne({
      _id: activity.company,
    });
  }
}
