import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Personnel } from './personnel.model';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelInput } from './dto/create-personnel.input';
import { Selected } from '../../common/decorators/selected.decorator';

@Auth(AuthType.None)
@Resolver(() => Personnel)
export class PersonnelResolver {
  constructor(private readonly personnelService: PersonnelService) {}

  @Query(() => [Personnel], { name: 'personnels', nullable: true })
  async findAll(@Selected() select): Promise<Personnel[]> {
    return this.personnelService.findAll({ select });
  }

  @Query(() => Personnel, { name: 'personnel' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<Personnel> {
    return this.personnelService.findOne({ id, select });
  }

  @Mutation(() => Personnel, { name: 'createPersonnel' })
  async create(
    @Args('createPersonnelInput') createPersonnelInput: CreatePersonnelInput,
  ) {
    return this.personnelService.create(createPersonnelInput);
  }
}
