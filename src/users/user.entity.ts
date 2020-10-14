import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserResponseDTO } from './user-response.dto';
import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(
    () => IdeaEntity,
    idea => idea.author,
    { onDelete: 'CASCADE' },
  )
  ideas: IdeaEntity[];

  @ManyToMany(() => IdeaEntity, {
    cascade: true,
  })
  @JoinTable()
  bookmarks: IdeaEntity[];

  @OneToMany(
    () => CommentEntity,
    comment => comment.author,
  )
  comments: CommentEntity[];

  get token(): string {
    const { id, username } = this;
    return sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }

  toResponseObject({
    message = undefined,
    showToken = true,
  }: {
    showToken?: boolean;
    message?: string;
  } = {}): UserResponseDTO {
    const { id, username, created } = this;
    const response: UserResponseDTO = { id, username, created, message };
    if (showToken) response.token = this.token;

    if (this.bookmarks) response.bookmarks = this.bookmarks;

    if (this.ideas) response.ideas = this.ideas;

    if (this.comments) response.comments = this.comments;
    return response;
  }

  async verifyPassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
