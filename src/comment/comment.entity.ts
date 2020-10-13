import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comment: string;

  @ManyToOne(
    () => UserEntity,
    user => user.comments,
  )
  author: UserEntity;

  @ManyToOne(
    () => IdeaEntity,
    idea => idea.comments,
  )
  idea: IdeaEntity;
}
