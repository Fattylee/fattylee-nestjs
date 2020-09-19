import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity) shopRepository: Repository<ShopEntity>,
  ) {}

  async createShop(){

  }
}
