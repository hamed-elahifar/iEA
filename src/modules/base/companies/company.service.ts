import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './company.model';
import { Model } from 'mongoose';
import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}

  findAll() {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.companyModel
        .find()
        // .skip(offset)
        // .limit(limit)
        .exec()
    );
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findOne({ _id: id }).exec();
    if (!company) {
      throw new NotFoundException(`${Company.name} #${id} not found`);
    }
    return company;
  }

  async create(createCompanyInput: CreateCompanyInput) {
    const company = new this.companyModel(createCompanyInput);
    return company.save();
  }
}
