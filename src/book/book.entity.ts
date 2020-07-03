import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @ManyToOne(() => IdeaEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  idea: IdeaEntity;
}
