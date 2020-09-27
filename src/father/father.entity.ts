import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChildEntity } from '../child/child.entity';

@ObjectType()
@Entity()
export class FatherEntity {
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
    () => ChildEntity,
    child => child.father,
  )
  @Field(() => [ChildEntity], { nullable: 'itemsAndList' })
  childrens: ChildEntity[];
}
