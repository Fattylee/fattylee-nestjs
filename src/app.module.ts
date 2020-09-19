import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService, ProductService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { IdeaModule } from './idea/idea.module';
import { ProfileModule } from './profile/profile.module';
import { BookModule } from './book/book.module';
import { ShopModule } from './shop/shop.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FatherModule } from './father/father.module';
import { Father } from './father/father.model';
import { Child } from './father/child.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fattylee',
      password: 'fattylee',
      database: 'ideas',
      synchronize: true,
      logging: true,
      dropSchema: false,
      entities: [Father, Child, 'dist/**/*.entity.js'],
    }),
    IdeaModule,
    ProfileModule,
    // BookModule,
    // ShopModule,
    // RecipeModule,
    // GraphQLModule.forRoot({
    // path: 'fat',
    // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    // context: ({}) => ({ papa: 'mumu' }),
    // typePaths: ['./**/*.gql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //     outputAs: 'class',
    //   },
    // }),
    FatherModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
