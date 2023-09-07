import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';
import { CreateUnitInput } from './dto/create-unit.input';
import { Selected } from '../../common/decorators/selected.decorator';

@Auth(AuthType.None)
@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Query(() => [Unit], { name: 'Units', nullable: true })
  async findAll(@Selected() select): Promise<Unit[]> {
    return this.unitService.findAll({ select });
  }

  @Query(() => Unit, { name: 'Unit' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<Unit> {
    return this.unitService.findOne({ id, select });
  }

  @Mutation(() => Unit, { name: 'createUnit' })
  async create(@Args('createUnitInput') createUnitInput: CreateUnitInput) {
    return this.unitService.create(createUnitInput);
  }
}
