import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest<Request>();

    if (req) {
      const auth = req.headers.authorization;
      if (!auth) return false;

      const [bearer, token] = auth.split(/\s+/);

      if (bearer.toLowerCase() !== 'bearer') {
        throw new HttpException(
          'Invalid token bearer, use "bearer"',
          HttpStatus.FORBIDDEN,
        );
      }

      const decoded = this.validateToken(token);
      req.user = decoded;
      return true;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      const auth = ctx.req.headers.authorization;
      if (!auth) return false;

      const [bearer, token] = auth.split(/\s+/);

      if (bearer.toLowerCase() !== 'bearer') {
        throw new HttpException(
          'Invalid token bearer, use "bearer"',
          HttpStatus.FORBIDDEN,
        );
      }

      const decoded = this.validateToken(token);
      ctx.user = decoded;
      return true;
    }
  }

  validateToken(token: string): any {
    try {
      return verify(token, process.env.SECRET);
    } catch (error) {
      throw new HttpException(
        'Token error: ' + (error.message || error.error),
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
