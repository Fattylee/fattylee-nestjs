import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserResponseDTO } from './user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(userPayload: UserDTO): Promise<UserResponseDTO> {
    const user = this.userRepo.create(userPayload);
    try {
      // throw new InternalServerErrorException();
      await this.userRepo.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          'Validation error: username already exist',
          HttpStatus.CONFLICT,
        );

      throw new InternalServerErrorException();
    }
    return user.toResponseObject();
  }
}
