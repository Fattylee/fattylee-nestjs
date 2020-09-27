import { ChildEntity } from './child.entity';
import { FatherEntity } from 'src/father/father.entity';
import {
  ResolveField,
  Parent,
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ChildService } from './child.service';
import { CreateChildInput } from './dto/create-child-input.dto';

@Resolver(() => ChildEntity)
export class ChildResolver {
  constructor(private readonly childService: ChildService) {}

  @Query(() => [ChildEntity], { name: 'children' })
  getChildren(): Promise<ChildEntity[]> {
    return this.childService.getchildren();
  }

  @ResolveField(() => FatherEntity)
  father(@Parent() child: ChildEntity): Promise<FatherEntity> {
    return this.childService.getFather(child.fatherId);
  }

  @Mutation(() => ChildEntity)
  createChild(
    @Args('id') id: string,
    @Args('data') data: CreateChildInput,
  ): Promise<ChildEntity> {
    return this.childService.createChild(id, data);
  }
}
