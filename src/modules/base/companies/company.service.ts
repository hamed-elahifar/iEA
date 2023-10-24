import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company, CompanyDocument } from './company.model';
import { CreateCompanyInput } from './dto/create-company.input';
import { CompanyRepository } from './company.repository';
import { BaseService } from '../../common/generic/base-service';

@Injectable()
export class CompanyService extends BaseService<CompanyDocument> {
  constructor(private readonly companyRepository: CompanyRepository) {
    super(Company);
  }
}

// async create(createCompanyInput: CreateCompanyInput) {
//   try {
//     return this.companyRepository.create(createCompanyInput);
//   } catch (error) {
//     console.log(error);
//     if ((error.code = 11000)) {
//       throw new ConflictException('Already Exists');
//     }
//   }
// }

// async findOne({
//   id,
//   select,
// }: {
//   id: string;
//   select?: string[];
// }): Promise<Company> {
//   const company = await this.companyRepository.findOne({ _id: id }, select);

//   if (!company) {
//     throw new NotFoundException(`${Company.name} #${id} not found`);
//   }

//   console.log(company);

//   return company;
// }

// async findAll({ select }) {
//   return this.companyRepository.findAll({}, select);
// }

// async update(id, attrs: Partial<CreateCompanyInput>): Promise<Company> {
//   const result = await this.companyRepository.update(
//     { _id: id },
//     { $set: attrs },
//   );

//   if (!result) {
//     throw new NotFoundException(`${id} not found`);
//   }

//   return result;
// }

// async delete(id: string) {
//   const result = await this.findOne({ id });
//   return result.deleteOne();
// }
