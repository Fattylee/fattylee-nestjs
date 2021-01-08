import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fattylee',
      password: 'fattylee',
      database: 'ideas_app',
      synchronize: true,
      logging: true,
      dropSchema: false,
      entities: ['dist/**/*.entity.js'],
    };
  }
}
