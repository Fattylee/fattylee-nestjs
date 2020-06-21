import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getAllProducts(): object[] {
    return [{ name: 'faker' }];
  }
}
