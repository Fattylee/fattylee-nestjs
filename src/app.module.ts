import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService, ProductService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { IdeaModule } from './idea/idea.module';
import { ProfileModule } from './profile/profile.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule, ProfileModule, BookModule],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
