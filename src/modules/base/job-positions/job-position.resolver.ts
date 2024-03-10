import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { JobPosition } from './job-position.model';
import { JobPositionService } from './job-position.service';
import { CreateJobPositionInput } from './dto/create-job-position.input';
import { Selected } from 'src/modules/common/decorators/selected.decorator';
import { Public } from 'src/modules/common/decorators';

@Public()
@Resolver(() => JobPosition)
export class JobPositionResolver {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @Query(() => [JobPosition], { name: 'positions', nullable: true })
  async findAll(@Selected() select): Promise<JobPosition[]> {
    return this.jobPositionService.findAll({ select });
  }

  @Query(() => JobPosition, { name: 'position' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<JobPosition> {
    return this.jobPositionService.findOne({ id, select });
  }

  @Mutation(() => JobPosition, { name: 'createStaff' })
  async create(
    @Args('createJobPositionInput')
    createJobPositionInput: CreateJobPositionInput,
  ) {
    return this.jobPositionService.create(createJobPositionInput);
  }
}
