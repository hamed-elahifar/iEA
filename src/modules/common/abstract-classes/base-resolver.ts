// import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
// import { Auth } from 'src/modules/auth/decorators/auth.decorators';
// import { AuthType } from 'src/modules/auth/enums/auth-type.enum';

// @Auth(AuthType.None)
// @Resolver(() => T)
// export abstract class BaseResolver {
//   constructor(private readonly service: ActivityService) {}

//   @Query(() => [T], { name: 'activities', nullable: true })
//   async findAll(): Promise<T[]> {
//     return this.service.findAll();
//   }

//   @Query(() => T, { name: 'activity' })
//   async findOne(@Args('id', { type: () => ID }) id: string): Promise<T> {
//     return this.service.findOne(id);
//   }

//   @Mutation(() => T, { name: 'createActivity' })
//   async create(@Args('createActivityInput') createActivityInput) {
//     return this.service.create(createActivityInput);
//   }
// }
