import { Resolver, Query, Args, ID, Mutation, Int } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';
import { BaseResolver } from '../../common/abstract/base-resolver';

@Auth(AuthType.None)
@Resolver((of) => Company)
export class CompanyResolver /*extends BaseResolver(Company)*/ {
  constructor(private readonly companyService: CompanyService) {
    // super(companyService);
  }
  @Mutation((returns) => Company, { name: 'createCompany', nullable: true })
  async create(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput);
  }

  @Query((returns) => [Company], { name: 'getCompanies', nullable: true })
  async findAll(
    @Args('PaginationArgs') paginationArgs: PaginationArgs,
    @Selected() select,
  ) {
    return this.companyService.findAll({ select });
  }

  @Query((returns) => Company, { name: 'getCompany', nullable: true })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ) {
    return this.companyService.findOne({ id, select });
  }

  @Mutation((returns) => Company, { name: 'updateCompany' })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.update(id, updateCompanyInput);
  }

  @Mutation((returns) => Company, { name: 'removeCompany' })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.remove(id);
  }
}
