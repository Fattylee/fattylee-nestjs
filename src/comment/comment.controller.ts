import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Get,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  createComment(
    @Param('id', ParseUUIDPipe) ideadId: string,
    @UserPayload('id') userId: string,
    @Body('comment') comment: string,
  ) {
    return this.commentService.createComment(ideadId, userId, comment);
  }

  @Get()
  comments() {
    return this.commentService.findAllComments();
  }

  @Get(':id')
  comment(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Get('idea/:id')
  findCommentsByIdea(@Param('id') id: string) {
    return this.commentService.findByIdea(id);
  }

  @Get('user/:id')
  findCommentByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.findByUser(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @UserPayload('id') userId: string,
  ) {
    return this.commentService.destroy(id, userId);
  }
}
