import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { UserResponseDTO } from './user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() userPayload: UserDTO): Promise<UserResponseDTO> {
    return this.userService.createUser(userPayload);
  }
}
