import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shops')
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: false })
  name: string;
}
