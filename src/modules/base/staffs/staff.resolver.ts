import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Staff as Entity } from './staff.model';
import { CreateStaffInput as CreateInput } from './dto/create-staff.input';
import { UpdateStaffInput as UpdateInput } from './dto/update-staff.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';
import { StaffService } from './staff.service';
import { Public } from 'src/modules/common/decorators';
import { WhereCondition } from '../../common/dto/where-condition.input';

@Public()
@Resolver((of) => Entity)
export class StaffResolver {
  constructor(private readonly service: StaffService) {}
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
    @Args('WhereCondition', { nullable: true }) where?: WhereCondition,
    @Args('PaginationArgs', { nullable: true }) pagination?: PaginationArgs,
  ) {
    const { where: query } = where;
    return this.service.findAll({ select, where: query, pagination });
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
