import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Holding as Entity } from './holding.model';
import { HoldingService } from './holding.service';
import { CreateHoldingInput as CreateInput } from './dto/create-holding.input';
import { UpdateHoldingInput as UpdateInput } from './dto/update-holding.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { PaginationArgs } from '../../common/dto/pagination.input';

@Resolver((of) => Entity)
export class HoldingResolver {
  constructor(private readonly service: HoldingService) {}
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

  @Mutation((returns) => Entity, { name: `remove${Entity.name}` })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
