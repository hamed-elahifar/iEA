import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { JobPosition as Entity } from './job-position.model';
import { JobPositionService } from './job-position.service';
import { CreateJobPositionInput as CreateInput } from './dto/create-job-position.input';
import { UpdateJobPositionInput as UpdateInput } from './dto/update-job-position.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';
import { UserRoleEnum } from 'src/modules/common/enums/user-role.enum';
import { Roles } from 'src/modules/common/decorators/roles.decorator';

@Resolver((of) => Entity)
export class JobPositionResolver {
  constructor(private readonly service: JobPositionService) {}

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
    @Args('PaginationArgs') paginationArgs: PaginationArgs,
    @Selected() select,
  ) {
    return this.service.findAll({ select });
  }

  @Query((returns) => Entity, {
    name: `findOne${Entity.name}`,
    nullable: true,
  })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
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

  @Roles(UserRoleEnum.ADMIN)
  @Mutation((returns) => Entity, { name: `remove${Entity.name}` })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
