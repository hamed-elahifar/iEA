import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AuthType } from '../../auth/enums/auth-type.enum';
import { Auth } from '../../auth/decorators/auth.decorators';
import { JobPosition } from './job-position.model';
import { JobPositionService } from './job-position.service';
import { CreateJobPositionInput } from './dto/create-job-position.input';

@Auth(AuthType.None)
@Resolver(() => JobPosition)
export class JobPositionResolver {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @Query(() => [JobPosition], { name: 'positions', nullable: true })
  async findAll(): Promise<JobPosition[]> {
    return this.jobPositionService.findAll();
  }

  @Query(() => JobPosition, { name: 'position' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<JobPosition> {
    return this.jobPositionService.findOne(id);
  }

  @Mutation(() => JobPosition, { name: 'createPersonnel' })
  async create(
    @Args('createJobPositionInput')
    createJobPositionInput: CreateJobPositionInput,
  ) {
    return this.jobPositionService.create(createJobPositionInput);
  }
}
