import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Role = createParamDecorator((context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);

  const request =
    gqlContext.getContext().req || context.switchToHttp().getRequest();

  SetMetadata('role', request.user.role);
});
