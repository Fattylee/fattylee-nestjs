import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';
import { Repository } from 'typeorm';

@Controller('shops')
export class ShopController {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  @Get()
  findAllShop(): Promise<ShopEntity[]> {
    return this.shopRepository.find();
  }

  @Get('create')
  async createShop(): Promise<ShopEntity> {
    const shop = this.shopRepository.create({ name: 'baba shop' });
    return this.shopRepository.save(shop);
  }
}
