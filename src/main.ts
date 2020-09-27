import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { ExceptionErrorFilter } from './exception-error.filter';
import { ValidationPipe } from './shared/validation.pipe';

config();
const port = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new ExceptionErrorFilter());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log('Server running on port ' + port, 'Bootstrap');
}
bootstrap();
