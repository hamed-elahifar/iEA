// import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AuthType } from '../../auth/enums/auth-type.enum';
// import { CompanyService } from './company.service';
// import { CreateCompanyInput } from './dto/create-company.input';
// import { Selected } from '../decorators/selected.decorator';

// export function createResolver({
//   cls,
//   findOneName,
//   findManyName,
//   createArgName,
//   createName,
// }: {
//   authType: AuthType;
//   cls: any;
//   findOneName: 'company';
//   findManyName: 'companies';
//   createName: 'createCompany';
//   createArgName: 'createCompanyInput';
// }) {
//   @Resolver((of) => cls)
//   class ResolverBase {
//     constructor(readonly companyService: CompanyService) {}

//     @Query((returns) => [cls], { name: findManyName, nullable: true })
//     async findAll(@Selected() selected) {
//       return this.companyService.findAll();
//     }

//     @Query((returns) => cls, { name: findOneName, nullable: true })
//     async findOne(@Args('id', { type: () => ID }) id: string) {
//       return this.companyService.findOne(id);
//     }

//     @Mutation((returns) => cls, { name: createName, nullable: true })
//     async create(@Args(createArgName) createCompanyInput: CreateCompanyInput) {
//       return this.companyService.create(createCompanyInput);
//     }
//   }

//   return ResolverBase;
// }
