import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() body: any): {} {
    console.log('body', body);
    return this.userService.createUser('fattylee', 'example@email.com');
    // return { nice: 'nice' };
  }
}
