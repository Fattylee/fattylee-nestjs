import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas(@Query('page') page: number) {
    return this.ideaService.showAll(page);
  }

  @Get('newest')
  showAllIdeasNewest(@Query('page') page: number) {
    return this.ideaService.showAll(page, true);
  }

  @Post()
  @UseGuards(new AuthGuard())
  createIdea(@Body() body: IdeaDTO, @UserPayload('id') userId: string) {
    return this.ideaService.createIdea(body, userId);
  }

  @Get(':id')
  async readIdea(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ideaService.getAIdea(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async destroyIdea(
    @Param('id') id: string,
    @UserPayload('id') userId: string,
  ) {
    return this.ideaService.deleteIdea(id, userId);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  updateIdea(
    @Param('id') id,
    // @Body() payload: { idea?: string; description?: string },
    @Body() payload: Partial<IdeaDTO>,
    @UserPayload('id') userId: string,
  ) {
    return this.ideaService.updateIdea(id, payload, userId);
  }

  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmark(@Param('id') id: string, @UserPayload('id') userId: string) {
    console.log(userId, '==========username=====================');
    return this.ideaService.bookmark(id, userId);
  }

  @Post(':id/unbookmark')
  @UseGuards(new AuthGuard())
  unbookmark(@Param('id') id: string, @UserPayload('id') userId: string) {
    return this.ideaService.unbookmark(id, userId);
  }

  @Post(':id/upvotes')
  @UseGuards(new AuthGuard())
  upvotes(@Param('id', ParseUUIDPipe) id, @UserPayload('id') userId: string) {
    return this.ideaService.upvotes(id, userId);
  }

  @Post(':id/downvotes')
  @UseGuards(new AuthGuard())
  downvotes(
    @Param('id', ParseUUIDPipe) id: string,
    @UserPayload('id', ParseUUIDPipe) userId: string,
  ) {
    return this.ideaService.downvotes(id, userId);
  }

  @Get('user-idea/:id')
  findauthorBYideaId(@Param('id') id: string) {
    return this.ideaService.findAuthorByIdeaId(id);
  }
}
