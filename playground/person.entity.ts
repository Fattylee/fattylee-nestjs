import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('persons')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column() name: string;
  @Column() age: number;

  @OneToMany(
    () => Product,
    product => product.person,
  )
  products: Product[];
}
