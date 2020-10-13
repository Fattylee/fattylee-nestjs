import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { CommentService } from 'src/comment/comment.service';
import { IdeaDTO } from './idea.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';

@Resolver('Idea')
export class IdeaResolver {
  constructor(
    private readonly ideaService: IdeaService,
    private readonly commentService: CommentService,
  ) {}

  @Query()
  ideas(
    @Args('data')
    data: { page: number; newest: boolean },
    // @InputType('data') data: any, didnt work as expected, try again
  ) {
    const { page, newest } = data;
    return this.ideaService.showAll(page, newest);
  }

  @Query()
  idea(@Args('id') id: string) {
    return this.ideaService.getAIdea(id);
  }

  @ResolveProperty()
  comments(@Parent() { id }: IdeaEntity) {
    return this.commentService.findByIdea(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  createIdea(
    @Args('data') payload: IdeaDTO,
    @UserPayload('id') userId: string,
  ) {
    return this.ideaService.createIdea(payload, userId);
  }
}
