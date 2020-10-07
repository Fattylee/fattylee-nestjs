import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const logger = new Logger(context.getClass().name);
    const now = Date.now();

    if (req) {
      const { method, url } = req;
      return next
        .handle()
        .pipe(
          tap(() =>
            logger.log(
              `${method} ${url} ${Date.now() - now}ms`,
              context.getClass().name,
            ),
          ),
        );
    } else {
      const ctx: any = GqlExecutionContext.create(context);
      const resolverName = ctx.constructorRef.name;
      const info = ctx.getInfo();

      return next
        .handle()
        .pipe(
          tap(() =>
            logger.log(
              `${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`,
              resolverName,
            ),
          ),
        );
      // return next.handle().pipe(tap(() => logger.log('hello================')));
    }
  }
}
