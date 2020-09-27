import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FatherEntity } from '../father/father.entity';

@ObjectType()
@Entity()
export class ChildEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(
    () => FatherEntity,
    father => father.childrens,
  )
  @Field(() => FatherEntity, { nullable: true })
  father: FatherEntity;

  @Column() fatherId: string;
}
