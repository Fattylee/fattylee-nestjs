import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('babami')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('name')
  mana() {
    return 'this is a resolver';
  }

  @Query()
  users() {
    return this.userService.getUsers();
  }
}
