import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './company.model';
import { Model } from 'mongoose';
import { CreateCompanyInput } from './dto/create-company.input';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create(createCompanyInput: CreateCompanyInput) {
    try {
      return this.companyRepository.create(createCompanyInput);
    } catch (error) {
      console.log(error);
      if ((error.code = 11000)) {
        throw new ConflictException('Already Exists');
      }
    }
  }

  findAll({ select }) {
    // const { limit, offset } = paginationQueryDto;
    return (
      this.companyModel
        .find()
        .select(select)
        // .skip(offset)
        // .limit(limit)
        .exec()
    );
  }

  async findOne({
    id,
    select,
  }: {
    id: string;
    select?: string[];
  }): Promise<Company> {
    const company = await this.companyModel
      .findOne({ _id: id })
      .select(select)
      .exec();

    if (!company) {
      throw new NotFoundException(`${Company.name} #${id} not found`);
    }

    return company;
  }

  async update(id, attrs: Partial<Company>): Promise<Company> {
    const result = await this.companyModel
      .findOneAndUpdate({ _id: id }, { $set: attrs }, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }

    return result;
  }

  async remove(id: string) {
    const result = await this.findOne({ id });
    return result.deleteOne();
  }
}
