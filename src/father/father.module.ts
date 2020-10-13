import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FatherEntity } from './father.entity';
import { ChildModule } from 'src/child/child.module';
import { FatherService } from './father.service';
import { ChildEntity } from 'src/child/child.entity';

@Module({
  imports: [ChildModule, TypeOrmModule.forFeature([FatherEntity, ChildEntity])],
  providers: [FatherService],
})
export class FatherModule {}
