import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { UserResponseDTO } from './user-response.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async fetchUsers(@UserPayload() payload: unknown): Promise<UserEntity[]> {
    console.log('Pay:', payload);
    return this.userService.getUsers();
  }

  @Post('register')
  async register(@Body() userPayload: UserDTO): Promise<UserResponseDTO> {
    return this.userService.createUser(userPayload);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() credentials: UserDTO): Promise<any> {
    return this.userService.login(credentials);
  }
}
