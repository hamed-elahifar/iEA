import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Department as Entity } from './department.model';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput as CreateInput } from './dto/create-department.input';
import { UpdateDepartmentInput as UpdateInput } from './dto/update-department.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';
// import { UserRoleEnum } from 'src/modules/common/enums/user-role.enum';
// import { Roles } from 'src/modules/common/decorators/roles.decorator';
import { WhereCondition } from '../../common/dto/where-condition.input';
import { GetRequestHeaders } from '../../common/decorators';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';

@UseGuards(AccessTokenGuard)
@Resolver((of) => Entity)
export class DepartmentResolver {
  constructor(private readonly service: DepartmentService) {}

  @Mutation((returns) => Entity, {
    name: `create${Entity.name}`,
    nullable: true,
  })
  async create(@Args(`create${Entity.name}Input`) createInput: CreateInput) {
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
    return this.service.findOne({ id, select });
  }

  @Mutation((returns) => Entity, { name: `update${Entity.name}` })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args(`update${Entity.name}Input`) updateInput: UpdateInput,
  ) {
    return this.service.update(id, updateInput);
  }

  @Mutation((returns) => Entity, { name: `remove${Entity.name}` })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
