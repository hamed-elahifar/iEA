import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Department } from './department.model';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Selected } from '../../common/decorators/selected.decorator';
import { Public } from 'src/modules/common/decorators';

@Public()
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => [Department], { name: 'Departments', nullable: true })
  async findAll(@Selected() select): Promise<Department[]> {
    return this.departmentService.findAll({ select });
  }

  @Query(() => Department, { name: 'Department' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @Selected() select,
  ): Promise<Department> {
    return this.departmentService.findOne({ id, select });
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  async create(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.create(createDepartmentInput);
  }
}
