import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

  @ManyToOne(
    () => UserEntity,
    user => user.ideas,
    { eager: true },
  )
  author: UserEntity;

  @ManyToMany(() => UserEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(() => UserEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  downvotes: UserEntity[];
}
