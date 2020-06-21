import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const res = { message: 'success', error: null };
    return res;
    // return 'Hello World!';
  }
}

@Injectable()
export class ProductService {
  getProducts(): string {
    return 'list of poducts';
  }
}

@Injectable()
export class UserService {
  createUser(): any {
    return { name: 'fattylee', age: 33, sex: 'm' };
  }
}
