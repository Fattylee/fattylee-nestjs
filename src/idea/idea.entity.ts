import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

  // @ManyToOne(
  //   () => UserEntity,
  //   user => user.ideas,
  // )
  // author: UserEntity;
}
