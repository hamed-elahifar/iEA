import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Activity } from './activity.model';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { CreateActivityInput } from './dto/create-activity.input';
import { ActivityService } from './activity.service';

@Auth(AuthType.None)
@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query(() => [Activity], { name: 'activities', nullable: true })
  async findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Query(() => Activity, { name: 'activity' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity, { name: 'createActivity' })
  async create(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ) {
    return this.activityService.create(createActivityInput);
  }
}
