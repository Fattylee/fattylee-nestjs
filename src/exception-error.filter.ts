import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class ExceptionErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (req) {
      const { url, method } = req;
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: url,
        method,
        message: (exception as any).message,
        error:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? (exception.message as any).error || exception.message || null
            : 'Internal server error',
        // error: (exception as any).response.error,
        // (exception && exception) || status === 500
        // ? 'Internal Server Error'
        // : undefined,
      };

      Logger.error(
        `${method} ${url} ` +
          JSON.stringify({ ...errorResponse, error: (exception as any).stack }),
        'ExceptionErrorFilter',
      );

      res.status(status).json(errorResponse);
    }
  }
}
