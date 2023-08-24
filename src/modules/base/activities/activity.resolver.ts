import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Activity } from './activity.model';
import { AuthType } from '../../../modules/auth/enums/auth-type.enum';
import { Auth } from '../../../modules/auth/decorators/auth.decorators';
import { CreateActivityInput } from './dto/create-activity.input';
import { ActivityService } from './activity.service';

@Auth(AuthType.None)
@Resolver((of) => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query((returns) => [Activity], { name: 'activities' })
  async findAll() {
    return this.activityService.findAll();
  }

  @Query((returns) => Activity, { name: 'activity' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.activityService.findOne(id);
  }

  @Mutation((returns) => Activity, { name: 'createActivity', nullable: true })
  async create(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ) {
    return this.activityService.create(createActivityInput);
  }
}
