import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { Personnel } from './personnel.model';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelInput } from './dto/create-personnel.input';

@Auth(AuthType.None)
@Resolver(() => Personnel)
export class PersonnelResolver {
  constructor(private readonly personnelService: PersonnelService) {}

  @Query(() => [Personnel], { name: 'personnels', nullable: true })
  async findAll(): Promise<Personnel[]> {
    return this.personnelService.findAll();
  }

  @Query(() => Personnel, { name: 'personnel' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Personnel> {
    return this.personnelService.findOne(id);
  }

  @Mutation(() => Personnel, { name: 'createPersonnel' })
  async create(
    @Args('createPersonnelInput') createPersonnelInput: CreatePersonnelInput,
  ) {
    return this.personnelService.create(createPersonnelInput);
  }
}
