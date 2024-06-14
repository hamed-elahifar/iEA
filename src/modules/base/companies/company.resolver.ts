import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Company as Entity } from './company.model';
import { CompanyService } from './company.service';
import { CreateCompanyInput as CreateInput } from './dto/create-company.input';
import { UpdateCompanyInput as UpdateInput } from './dto/update-company.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { WhereCondition } from '../../common/dto/where-condition.input';
import { GetCurrentUser, GetRequestHeaders } from '../../common/decorators';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';

// @UseGuards(RolesGuard) 
@UseGuards(AccessTokenGuard)
@Resolver((of) => Entity)
export class CompanyResolver {
  constructor(private readonly service: CompanyService) { }

  // @Roles(UserRoleEnum.ADMIN)
  @Mutation((returns) => Entity, {
    name: `create${Entity.name}`,
    nullable: true,
  })
  async create(@Args(`create${Entity.name}Input`) createInput: CreateInput, @GetCurrentUser() user: any) {
    console.log(user)
    return this.service.create(createInput);
  }


  @Query((returns) => [Entity], {
    name: `findAll${Entity.name}`,
    nullable: true,
  })
  async findAll(
    @Selected() select,
    @GetRequestHeaders('companyid') companyID,
    @Args('WhereCondition', { nullable: true }) whereCondition?: WhereCondition,
    @Args('PaginationArgs', { nullable: true }) pagination?: PaginationArgs,
  ) {
    const { where = {} } = whereCondition;

    if (companyID) {
      Object.assign(where, { company: companyID });
    }

    return this.service.findAll({ select, where, pagination });
  }

  @Query((returns) => Entity, {
    name: `findOne${Entity.name}`,
    nullable: true,
  })
  async findOne(
    @Selected() select,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.service.findOne({ _id: id }, select);
  }

  @Mutation((returns) => Entity, { name: `update${Entity.name}` })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args(`update${Entity.name}Input`) updateInput: UpdateInput,
  ) {
    return this.service.update(id, updateInput);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Mutation((returns) => Entity, { name: `remove${Entity.name}` })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
