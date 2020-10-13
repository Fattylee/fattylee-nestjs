import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from './child.entity';
import { ChildService } from './child.service';
import { FatherEntity } from 'src/father/father.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChildEntity, FatherEntity])],
  providers: [ChildService],
})
export class ChildModule {}
