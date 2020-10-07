import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './idea.entity';
import { Repository } from 'typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from 'src/users/user.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private ensureOwnership(idea: IdeaEntity, userId: string) {
    if (idea.author.id !== userId)
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
  }

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    const responseObject: any = {
      ...idea,
      author: idea.author.toResponseObject({
        showToken: false,
      }),
    };

    if (responseObject.upvotes) responseObject.upvotes = idea.upvotes.length;
    // if (idea.upvotes) responseObject.upvotes = idea.upvotes.length;

    if (idea.downvotes) responseObject.downvotes = idea.downvotes.length;

    return responseObject;
  }

  private logger = new Logger('IdeaService');

  private logData({
    id,
    data,
    user,
  }: {
    id?: string;
    data?: any;
    user?: string;
  }) {
    id && this.logger.log(`IDEA: ${id}`);
    data && this.logger.log(`DATA: ${JSON.stringify(data)}`);
    user && this.logger.log(`USER: ${user}`);
  }

  async showAll(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({
      order: { created: -1 },
      relations: ['author', 'downvotes', 'upvotes'],
    });

    console.log(ideas);
    return ideas.map(idea => this.toResponseObject(idea));
  }

  async getAIdea(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author'],
    });

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return this.toResponseObject(idea);
  }

  async createIdea(payload: IdeaDTO, userId: string): Promise<IdeaRO> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const idea = this.ideaRepository.create(payload);
    idea.author = user;
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  async deleteIdea(id: string, userId: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author'],
    });

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    this.ensureOwnership(idea, userId);
    await this.ideaRepository.delete({ id });
    return this.toResponseObject(idea);
  }

  async updateIdea(id, payload: Partial<IdeaDTO>, userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author'],
    });

    if (!idea) {
      throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
    }
    // await this.ideaRepository.update(id, payload);
    this.ensureOwnership(idea, userId);

    this.logData({ id, data: payload, user: userId });

    const test: any = new IdeaDTO();
    test.pap = 'pap';
    console.log(test, test);
    const test2 = new IdeaDTO();
    console.log(Object.assign(test2, { last: 'last' }));
    console.log('test2', test2);
    const obj = new IdeaDTO();
    Object.assign(obj, payload);
    (obj as any).list = 'kkook';
    console.log(obj);

    try {
      const validValues = await validateOrReject(obj, {
        skipUndefinedProperties: true,
        forbidUnknownValues: true,
        whitelist: true,
      });

      console.log(validValues);
      console.log('======================');
      Object.assign(idea, payload);
      console.log(idea);
      await this.ideaRepository.save(idea);
      return this.toResponseObject(idea);
    } catch (errors) {
      const errorMessages = (errors as any[])
        .reduce((acc, curValue) => {
          for (const key in curValue.constraints) {
            if (
              Object.prototype.hasOwnProperty.call(curValue.constraints, key)
            ) {
              acc.push(curValue.constraints[key]);
            }
          }
          return acc;
        }, [])
        .join(', ');

      throw new HttpException(
        `Validation failed: ${errorMessages}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async bookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne(id);
    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const user = await this.userRepository.findOne(userId, {
      relations: ['bookmarks'],
    });

    if (user.bookmarks.find(ideaBookmark => ideaBookmark.id === idea.id)) {
      throw new HttpException('idea already bookmarked', HttpStatus.CONFLICT);
    } else {
      user.bookmarks.push(idea);
      await this.userRepository.save(user);
    }

    return user.toResponseObject({ showToken: false });
  }

  async unbookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne(id);
    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    console.log(idea, '====================');
    const user = await this.userRepository.findOne(userId, {
      relations: ['bookmarks'],
    });

    if (user.bookmarks.find(ideaBookmark => ideaBookmark.id === idea.id)) {
      console.log('i was here', '=====================');
      user.bookmarks = user.bookmarks.filter(
        ideaBookmark => ideaBookmark.id !== idea.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException('idea already unbookmarked', HttpStatus.CONFLICT);
    }

    return user.toResponseObject({ showToken: false });
  }
}
