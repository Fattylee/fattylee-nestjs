import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildEntity } from './child.entity';
import { FatherEntity } from 'src/father/father.entity';
import { CreateChildInput } from './dto/create-child-input.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(ChildEntity)
    private readonly childRepo: Repository<ChildEntity>,
    @InjectRepository(FatherEntity)
    private readonly fatherRepo: Repository<FatherEntity>,
  ) {}

  getchildren(): Promise<ChildEntity[]> {
    return this.childRepo.find();
  }

  getFather(id: string): Promise<FatherEntity> {
    return this.fatherRepo.findOne(id);
  }

  async createChild(
    fatherId: string,
    { name }: CreateChildInput,
  ): Promise<ChildEntity> {
    const father = await this.fatherRepo.findOne(fatherId);
    if (!father) throw new Error('Father not found!');
    const child = this.childRepo.create({ father, name });
    return this.childRepo.save(child);
  }
}
