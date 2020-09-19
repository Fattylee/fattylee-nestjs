import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';

class MyError implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const respond = ctx.getResponse();
    const errorMessage = {
      error: exception.message,
    };
    respond.status(404).json();
    throw new Error('Method not implemented.');
  }
}
