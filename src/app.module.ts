import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { IdeaModule } from './idea/idea.module';
import { ProfileModule } from './profile/profile.module';
import { BookModule } from './book/book.module';
import { ShopModule } from './shop/shop.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FatherModule } from './father/father.module';
import { FatherEntity } from './father/father.entity';
import { ChildEntity } from './child/child.entity';
import { ChildModule } from './child/child.module';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionErrorFilter } from './exception-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from './shared/validation.pipe';
import { UserResolver } from './users/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({ typePaths: ['**/*.graphql', '**/*.gql'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fattylee',
      password: 'fattylee',
      database: 'ideas_app',
      synchronize: true,
      logging: true,
      dropSchema: false,
      entities: ['dist/**/*.entity.js'],
    }),
    // ProfileModule,
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
    // FatherModule,
    // ChildModule,
    CatsModule,
    UserModule,
    IdeaModule,
  ],
  controllers: [],
  providers: [
    AppService,
    // ProductService,
    {
      provide: APP_FILTER,
      useClass: ExceptionErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
