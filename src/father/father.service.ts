import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildEntity } from 'src/child/child.entity';
import { FatherEntity } from './father.entity';
import { CreateUSerArgs } from './dto/create-user-args.dto';

@Injectable()
export class FatherService {
  constructor(
    @InjectRepository(ChildEntity)
    private readonly childRepo: Repository<ChildEntity>,
    @InjectRepository(FatherEntity)
    private readonly fatherRepo: Repository<FatherEntity>,
  ) {}

  getChildren(id: string): Promise<ChildEntity[]> {
    return this.childRepo.find({ where: { fatherId: id } });
  }

  getFathers(): Promise<FatherEntity[]> {
    return this.fatherRepo.find();
  }

  getFather(id: string): Promise<FatherEntity | null> {
    return this.fatherRepo.findOne(id);
  }

  createFather(payload: CreateUSerArgs): Promise<FatherEntity> {
    const father = this.fatherRepo.create(payload);
    return this.fatherRepo.save(father);
  }
}
