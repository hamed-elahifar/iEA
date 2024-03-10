import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/modules/auth/types';

export const GetCurrentUserHTTP = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
