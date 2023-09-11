import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { REQUEST_USER_KEY } from '../../auth.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const currentUserUserName: ActiveUserData | undefined =
      request[REQUEST_USER_KEY];

    if (currentUserUserName) {
      console.log(currentUserUserName);

      const user = await this.authService.findByUsername(currentUserUserName);
      request.currentUser = user;
    }

    return next.handle();
  }
}
