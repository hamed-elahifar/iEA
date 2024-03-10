import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const getRequest = (context: ExecutionContext) => {
      if (context.getType<ContextType | 'graphql'>() === 'graphql') {
        return GqlExecutionContext.create(context).getContext().req;
      }
      return context.switchToHttp().getRequest();
    };

    if (!requireRoles || requireRoles.length === 0) {
      return true;
    }
    const { user } = getRequest(context);

    // return requireRoles.some((role) => user.roles === role);
    return requireRoles.some((r) => user.roles.includes(r));
  }
}
