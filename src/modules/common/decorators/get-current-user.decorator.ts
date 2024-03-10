import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'src/modules/auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);

    const request =
      gqlContext.getContext().req ?? context.switchToHttp().getRequest();

    return data ? request.user[data] : request.user; // Retrieve specific user data
  },
);
