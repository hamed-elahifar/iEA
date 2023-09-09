import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../auth/enums/auth-type.enum';
import { Auth } from '../../auth/decorators/auth.decorators';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { StaffDto } from './dto/staff.output';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

@Auth(AuthType.None)
@Serialize(StaffDto)
@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Query(() => [Staff], { name: 'staffs', nullable: true })
  async findAll(@Selected() select): Promise<Staff[]> {
    return this.staffService.findAll({ select });
  }

  @Query(() => Staff, { name: 'staff' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<Staff> {
    return this.staffService.findOne({ id, select });
  }

  @Mutation(() => Staff, { name: 'createStaff' })
  async create(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }
}
