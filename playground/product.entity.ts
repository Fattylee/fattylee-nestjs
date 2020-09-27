import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Person } from './person.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column() name: string;
  @ManyToOne(
    () => Person,
    person => person.products,
  )
  person: Person;
}
