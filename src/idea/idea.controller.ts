import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}
  @Get()
  async showAllIdeas() {
    return await this.ideaService.showAll();
  }

  @Post()
  async createIdea(@Body() body: { idea: string; description: string }) {
    return await this.ideaService.createIdea(body);
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
