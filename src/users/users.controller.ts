import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Res,
  Header,
  Param,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDTO, UserRO } from './dto/user.dto';
import { UserResponseDTO } from './user-response.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserPayload } from 'src/shared/user.decorator';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers(
    @Query('page') page: number,
    @Query('amount') amount: number,
  ): Promise<UserRO[]> {
    return this.userService.getUsers(page, amount);
  }

  @Get(':id')
  async fetchAUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserRO> {
    return this.userService.fetchAUser(id);
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

  @Delete()
  @UseGuards(new AuthGuard())
  deleteUser(@UserPayload('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
