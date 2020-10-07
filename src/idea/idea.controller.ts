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
  ParseIntPipe,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
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
    return this.ideaService.bookmark(id, userId);
  }

  @Post(':id/unbookmark')
  @UseGuards(new AuthGuard())
  unbookmark(@Param('id') id: string, @UserPayload('id') userId: string) {
    return this.ideaService.unbookmark(id, userId);
  }
}
