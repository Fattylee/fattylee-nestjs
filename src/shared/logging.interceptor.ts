import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest();
    const now = Date.now();
    const logger = new Logger(context.getClass().name);
    return next
      .handle()
      .pipe(
        tap(() =>
          logger.log(
            `After.. ${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
