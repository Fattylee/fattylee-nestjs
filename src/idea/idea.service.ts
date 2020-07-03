import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './idea.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';
import { IdeaDTO } from './idea.dto';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async showAll(): Promise<IdeaDTO[]> {
    return await this.ideaRepository.find();
  }

  async getAIdea(id: string): Promise<IdeaDTO> {
    // return await this.ideaRepository.findOne(id);
    return await this.ideaRepository.findOne({ where: { id } });
  }
  async createIdea(payload: IdeaDTO) {
    const idea = this.ideaRepository.create(payload);
    return await this.ideaRepository.save(idea);
  }
  async deleteIdea(id) {
    // return await this.ideaRepository.delete(id);
    await this.ideaRepository.delete({ id });
    return { deleted: true };
  }
  async updateIdea(id, payload: Partial<IdeaDTO>) {
    return await this.ideaRepository.update({ id }, payload);
  }
}
