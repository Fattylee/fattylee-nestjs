import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([ShopEntity])],
  controllers: [ShopController],
})
export class ShopModule {}
