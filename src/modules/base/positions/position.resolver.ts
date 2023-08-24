import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Position } from './position.model';
import { PositionService } from './position.service';
import { CreatePositionInput } from './dto/create-position.input';

@Auth(AuthType.None)
@Resolver(() => Position)
export class PositionResolver {
  constructor(private readonly positionService: PositionService) {}

  @Query(() => [Position], { name: 'positions', nullable: true })
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Query(() => Position, { name: 'position' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @Mutation(() => Position, { name: 'createPersonnel' })
  async create(
    @Args('createPositionInput') createPositionInput: CreatePositionInput,
  ) {
    return this.positionService.create(createPositionInput);
  }
}
