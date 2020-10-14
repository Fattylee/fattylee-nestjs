import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from './idea.entity';
import { Repository } from 'typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from 'src/users/user.entity';
import { validateOrReject } from 'class-validator';
import { Votes } from './idea.enum';

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
      throw new HttpException(
        'You do not own this idea entity',
        HttpStatus.UNAUTHORIZED,
      );
  }

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    const responseObject: any = {
      ...idea,
      // author: idea.author.toResponseObject({
      // showToken: false,
      // }),
    };

    if (responseObject.author)
      responseObject.author = idea.author.toResponseObject({
        showToken: false,
      });

    if (responseObject.upvotes) responseObject.upvotes = idea.upvotes.length;

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

  private async vote(idea: IdeaEntity, user: UserEntity, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;
    const userId = user.id;

    // already (un)voted
    if (idea[vote].find(author => author.id === userId)) {
      // remove (un)vote
      idea[vote] = idea[vote].filter(author => author.id !== userId);
    } else {
      // cast (un)vote
      idea[vote].push(user);
      // remove existing opposite if any
      idea[opposite] = idea[opposite].filter(author => author.id !== userId);
    }

    await this.ideaRepository.save(idea);
    return idea;
  }

  async showAll(page = 1, newest = false): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({
      order: newest && { created: -1 },
      skip: 25 * (page - 1),
      take: 25,
      relations: [
        // 'author',
        // 'author.ideas',
        // 'downvotes',
        'upvotes',
        // 'comments',
        // 'comments.author',
      ],
    });

    return ideas.map(idea => this.toResponseObject(idea));
  }

  async getAIdea(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author', 'comments', 'comments.author'],
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

  async findAuthorByIdeaId(ideaId: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id: ideaId },
      relations: ['author'],
    });

    if (!idea)
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    console.log(idea);
    return idea.author;
  }

  async findUpvotesCountByIdeaId(ideaId: string) {
    const idea = await this.ideaRepository.findOne(ideaId, {
      // where: { id: ideaId },
      relations: ['upvotes'],
    });

    if (!idea) throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
    return idea.upvotes.length;
  }

  async deleteIdea(id: string, userId: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author'],
    });

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    this.ensureOwnership(idea, userId);
    await this.ideaRepository.remove(idea);

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

    const obj = new IdeaDTO();
    Object.assign(obj, payload);

    try {
      await validateOrReject(obj, {
        skipUndefinedProperties: true,
        forbidUnknownValues: true,
        whitelist: true,
      });

      Object.assign(idea, payload);
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

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bookmarks', 'comments', 'ideas'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

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

    const user = await this.userRepository.findOne(userId, {
      relations: ['bookmarks'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (user.bookmarks.find(ideaBookmark => ideaBookmark.id === idea.id)) {
      user.bookmarks = user.bookmarks.filter(
        ideaBookmark => ideaBookmark.id !== idea.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException('idea already unbookmarked', HttpStatus.CONFLICT);
    }

    return user.toResponseObject({ showToken: false });
  }

  async upvotes(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author', Votes.DOWN, Votes.UP],
    });

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const user = await this.userRepository.findOne(userId, {
      relations: ['bookmarks'],
    });

    if (user.id === idea.author.id) {
      throw new HttpException(
        'Cannot cast vote on self-idea',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.vote(idea, user, Votes.UP);
    return this.toResponseObject(idea);
  }

  async downvotes(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['author', Votes.DOWN, Votes.UP],
    });

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const user = await this.userRepository.findOne(userId, {
      relations: ['bookmarks'],
    });

    if (user.id === idea.author.id) {
      throw new HttpException(
        'Cannot cast vote on self-idea',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return this.toResponseObject(await this.vote(idea, user, Votes.DOWN));
  }
}
