import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAllProducts(): string {
    console.log(this.productService.getAllProducts());
    return 'nice one baba';
  }
}
