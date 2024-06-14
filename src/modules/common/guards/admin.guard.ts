// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { Reflector } from '@nestjs/core';
// import { UserRoleEnum } from '../enums/user-role.enum';

// export const RoleDecorator = createParamDecorator((role: string) => {
//   return (context: ExecutionContext) => {
//     const ctx = GqlExecutionContext.create(context);
//     const reflector = new Reflector();
//     const isPublic = reflector.getAllAndOverride('isPublic', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (isPublic) return true; // Allow public routes

//     const request = ctx.getContext().req; // Access GraphQL request

//     if (!request.user) {
//       throw new Error('Unauthorized'); // Handle missing JWT
//     }

//     const userRole = request.user.role; // Replace 'role' with your property name

//     if (userRole !== UserRoleEnum.ADMIN) {
//       throw new Error('Forbidden: Insufficient privileges'); // Handle unauthorized role
//     }

//     return true; // Allow access if role matches
//   };
// });
