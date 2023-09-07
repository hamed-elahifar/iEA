import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Activity } from './activity.model';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { CreateActivityInput } from './dto/create-activity.input';
import { ActivityService } from './activity.service';
import { Selected } from '../../common/decorators/selected.decorator';

@Auth(AuthType.None)
@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query(() => [Activity], { name: 'activities', nullable: true })
  async findAll(@Selected() select): Promise<Activity[]> {
    return this.activityService.findAll({ select });
  }

  @Query(() => Activity, { name: 'activity' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<Activity> {
    return this.activityService.findOne({ id, select });
  }

  @Mutation(() => Activity, { name: 'createActivity' })
  async create(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ) {
    return this.activityService.create(createActivityInput);
  }
}
