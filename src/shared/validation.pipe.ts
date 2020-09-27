import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateCatDTO } from 'src/cats/create-cat.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(
    value: CreateCatDTO,
    { metatype }: ArgumentMetadata,
  ): Promise<any> {
    if (value instanceof Object && this.isEmpty(value))
      throw new HttpException(
        'Validation failed: Body can not be empty',
        HttpStatus.BAD_REQUEST,
      );
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${this.formatError(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatError(errors: any[]) {
    return errors
      .map(error => {
        for (const prop in error.constraints) {
          return error.constraints[prop];
        }
      })
      .join(', ');
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) return false;
    return true;
  }
}
