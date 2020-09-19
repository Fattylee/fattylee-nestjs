import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Child } from './child.model';

@ObjectType()
@Entity()
export class Father {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @OneToMany(
    () => Child,
    child => child.father,
  )
  @Field(() => [Child], { nullable: 'itemsAndList' })
  childrens: Child[];
}
