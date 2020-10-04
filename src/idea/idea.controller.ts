import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { IdeaDTO } from './idea.dto';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  createIdea(@Body() body: IdeaDTO) {
    return this.ideaService.createIdea(body);
  }

  @Get(':id')
  async readIdea(@Param('id') id: string) {
    return this.ideaService.getAIdea(id);
  }

  @Delete(':id')
  async destroyIdea(@Param('id') id: string) {
    return this.ideaService.deleteIdea(id);
  }

  @Put(':id')
  updateIdea(
    @Param('id') id,
    @Body() payload: { idea?: string; description?: string },
  ) {
    return this.ideaService.updateIdea(id, payload);
  }
}
