import { FatherEntity } from './father.entity';
import { ChildEntity } from 'src/child/child.entity';
import {
  Query,
  ResolveField,
  Parent,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { FatherService } from './father.service';
import { CreateUSerArgs } from './dto/create-user-args.dto';

@Resolver(() => FatherEntity)
export class FatherResolver {
  constructor(private readonly fatherService: FatherService) {}

  @ResolveField(() => [ChildEntity])
  childrens(@Parent() father: FatherEntity): Promise<ChildEntity[]> {
    console.log(father);
    const { id } = father;
    return this.fatherService.getChildren(id);
  }

  @Query(() => [FatherEntity], { nullable: true, name: 'fathers' })
  getFathers(): Promise<FatherEntity[] | null> {
    return this.fatherService.getFathers();
  }

  @Query(() => FatherEntity, { nullable: true, name: 'father' })
  getFather(@Args('id') id: string): Promise<FatherEntity | null> {
    return this.fatherService.getFather(id);
  }

  @Mutation(() => FatherEntity)
  createFather(@Args() payload: CreateUSerArgs): Promise<FatherEntity> {
    console.log(payload);
    return this.fatherService.createFather(payload);
  }
}
