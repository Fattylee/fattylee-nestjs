import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService, ProductService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}

