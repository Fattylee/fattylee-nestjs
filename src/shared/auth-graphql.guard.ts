import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGraphqlGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: any = GqlExecutionContext.create(context).getContext();
    const auth: string = ctx.req.headers.authorization;
    if (!auth) return false;
    const [bearer, token] = auth.split(/\s+/);
    if (bearer.toLowerCase() !== 'bearer')
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    try {
      const decoded = verify(token, process.env.SECRET);
      ctx.req.headers.payload = decoded;
      return true;
    } catch (error) {
      throw new HttpException(
        'Token error: ' + error.message || error.name,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
