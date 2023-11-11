import { Resolver, Query, Args, ID, Mutation, Int } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Company, CompanyDocument } from './company.model';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';

@Auth(AuthType.None)
@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}
  @Mutation((returns) => Company, { name: 'createCompany', nullable: true })
  async create(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput);
  }

  @Query((returns) => [Company], {
    name: `findAll${Company.name}`,
    nullable: true,
  })
  async findAll(
    @Args('PaginationArgs') paginationArgs: PaginationArgs,
    @Selected() select,
  ) {
    return this.companyService.findAll({ select });
  }

  @Query((returns) => Company, {
    name: `findOne${Company.name}`,
    nullable: true,
  })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ) {
    return this.companyService.findOne({ id, select });
  }

  @Mutation((returns) => Company, { name: `update${Company.name}` })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.update(id, updateCompanyInput);
  }

  @Mutation((returns) => Company, { name: `remove${Company.name}` })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.delete(id);
  }
}
