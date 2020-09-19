import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Father } from './father.model';

@ObjectType()
@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(
    () => Father,
    father => father.childrens,
  )
  @Field(() => Father)
  father: Father;
}
