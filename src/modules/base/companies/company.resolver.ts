import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.input';

@Auth(AuthType.None)
@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query((returns) => [Company], { name: 'companies', nullable: true })
  async findAll() {
    return this.companyService.findAll();
  }

  @Query((returns) => Company, { name: 'company', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation((returns) => Company, { name: 'createCompany', nullable: true })
  async create(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput);
  }
}
