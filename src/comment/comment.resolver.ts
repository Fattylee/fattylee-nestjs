import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query()
  comments() {
    return this.commentService.findAllComments();
  }

  @Mutation()
  createComment(
    @Args() data: { ideaId: string; userId: string; comment: string },
  ) {
    const { ideaId, userId, comment } = data;
    return this.commentService.createComment(ideaId, userId, comment);
  }
}
