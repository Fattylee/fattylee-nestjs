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
import { UserEntity } from 'src/users/user.entity';

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
  async comments(@Parent() idea: IdeaEntity) {
    const { id } = idea;
    const comments = await this.commentService.findByIdea(id);
    return comments;
  }

  @ResolveProperty()
  author(@Parent() idea: IdeaEntity) {
    return this.ideaService.findAuthorByIdeaId(idea.id);
  }

  @ResolveProperty()
  upvotes(@Parent() idea: IdeaEntity) {
    // return this.ideaService.findUpvotesCountByIdeaId(idea.id);
    return 8;
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
