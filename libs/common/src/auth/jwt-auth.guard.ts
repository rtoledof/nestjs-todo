import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE } from './services';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    
    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string = '';
    try {
      switch (context.getType()) {
        case 'http':
          authentication = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];
          break;
        case 'rpc':
          authentication = context.switchToRpc().getData().Authentication;
          break;
        default:
          const ctx = GqlExecutionContext.create(context);
          authentication = ctx.getContext().req.headers.authorization;
          break;
      }
    } catch (error) {
      throw new UnauthorizedException('Failed to extract authentication from context');
    }
   
    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for the authentication',
      );
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
