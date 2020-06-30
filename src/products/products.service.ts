import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  public products: any = [];

  getAllProducts() {
    const newProduct = new Product('title 1', 'description 1');
    console.log('newProduct', newProduct);
    return this.products.map(e => e);
    // return [{ name: 'faker' }];
  }

  createProduct() {
    return { title: 'title one', description: 'description one' };
  }
}
