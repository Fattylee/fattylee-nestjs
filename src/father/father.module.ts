import { Module } from '@nestjs/common';
import {
  Query,
  GraphQLModule,
  Resolver,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Father } from './father.model';
import { Child } from './child.model';
import { Repository } from 'typeorm';

const fathers = [
  { id: '1', name: 'father 1', age: 12, childrens: '1' },
  { id: '2', name: 'father 2', age: 87, childrens: '2' },
];

const childrens = [
  { id: '1', name: 'fat' },
  { id: '1', name: 'yam' },
];

@Resolver(() => Father)
export class FatherResolver {
  constructor(
    @InjectRepository(Child) private readonly childRepo: Repository<Child>,
    @InjectRepository(Father) private readonly fatherRepo: Repository<Father>,
  ) {}
  // @ResolveField(() => Int)
  // age(@Parent() fah: Father): number {
  //   console.log(fah);
  //   return 12387;
  // }
  @ResolveField(() => [Child])
  childrens(@Parent() fah: Father): Promise<Child[]> {
    console.log(fah);
    const { id } = fah;
    return this.childRepo.find({ where: { father: id } });
  }

  @Query(() => [Father], { nullable: true })
  async father(): Promise<Father[]> {
    // return Promise.resolve(fathers[0]);
    // return Promise.resolve({
    //   id: '1',
    //   age: 12,
    //   name: 'hsg',
    //   childrens: null,
    // });
    const father = this.fatherRepo.create({ name: 'father 2', age: 1 });
    // await this.fatherRepo.save(father);
    // const child = this.childRepo.create({ name: 'child 2', father });
    // await this.childRepo.save(child)
    return this.fatherRepo.find();
  }
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Father, Child]),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [FatherResolver],
})
export class FatherModule {}
