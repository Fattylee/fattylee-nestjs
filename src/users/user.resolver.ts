import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserRO, UserDTO } from './dto/user.dto';
import { CommentService } from 'src/comment/comment.service';
import { Response } from 'express';
import { UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query()
  @UseGuards(new AuthGuard())
  whoami(@Context('user') { id }) {
    return this.userService.fetchAUser(id);
  }

  @Query()
  users(@Args('page') page: number, @Args('amount') amount: number) {
    return this.userService.getUsers(page, amount);
  }

  @ResolveProperty()
  comments(@Parent() { id }: UserRO) {
    return this.commentService.findByUser(id);
  }

  @Mutation()
  login(@Args('credentials') data: UserDTO) {
    return this.userService.login(data);
  }

  @Mutation()
  register(@Args('credentials') data: UserDTO) {
    return this.userService.createUser(data);
  }
}
