import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { CommentService } from 'src/comment/comment.service';
import { CommentEntity } from 'src/comment/comment.entity';
import { IdeaEntity } from 'src/idea/idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CommentEntity, IdeaEntity])],
  controllers: [UserController],
  providers: [UserService, UserResolver, CommentService],
})
export class UserModule {}
