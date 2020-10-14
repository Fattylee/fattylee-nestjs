import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

  @Column('text') authorId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.ideas,
    // { eager: true },
    { cascade: true, onDelete: 'CASCADE', nullable: true, onUpdate: 'CASCADE' },
  )
  author: UserEntity;

  @ManyToMany(() => UserEntity, {
    cascade: true,
    // eager: true,
  })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(() => UserEntity, {
    cascade: true,
    // eager: true,
  })
  @JoinTable()
  downvotes: UserEntity[];

  @OneToMany(
    () => CommentEntity,
    comment => comment.idea,
    { cascade: true },
  )
  comments: CommentEntity[];
}
