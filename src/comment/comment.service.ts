import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { IdeaEntity } from 'src/idea/idea.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>,
  ) {}

  toResponseObject(comment: CommentEntity) {
    const response: any = comment;
    if (response.author)
      response.author = response.author.toResponseObject({ showToken: false });

    return response;
  }

  async findAllComments() {
    const comments = await this.commentRepository.find({
      relations: ['idea', 'author'],
    });

    return comments.map(comment => this.toResponseObject(comment));
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['idea', 'author'],
    });

    if (!comment)
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);

    return this.toResponseObject(comment);
  }

  async createComment(ideaId: string, userId: string, comment: string) {
    const idea = await this.ideaRepository.findOne(ideaId);

    if (!idea) throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);

    const author = await this.userRepository.findOne(userId);

    const newComment = this.commentRepository.create({ comment, author, idea });
    await this.commentRepository.save(newComment);

    return this.toResponseObject(newComment);
  }

  async findByIdea(id: string) {
    const idea = await this.ideaRepository.findOne(id, {
      relations: ['comments', 'comments.author', 'comments.idea'],
    });

    if (!idea) throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);

    return idea.comments.map(comment => this.toResponseObject(comment));
  }

  async findByUser(author: string) {
    const user = await this.userRepository.findOne(author);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const comments = await this.commentRepository.find({
      // where: { author: user }, this also works
      where: { author },
      relations: ['author'],
    });

    return comments.map(comment => this.toResponseObject(comment));
  }

  async destroy(id: string, userId: string) {
    const comment = await this.commentRepository.findOne(id);

    if (!comment)
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);

    if (comment.author.id !== userId)
      throw new HttpException(
        'You do not own the comment',
        HttpStatus.UNAUTHORIZED,
      );

    const removedComment = await this.commentRepository.remove(comment);
    console.log(removedComment);

    return comment;
  }
}
