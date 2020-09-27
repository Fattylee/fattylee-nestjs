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

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepo.find({ select: ['id', 'username', 'created'] });
  }

  async createUser(userPayload: UserDTO): Promise<UserResponseDTO> {
    const user = this.userRepo.create(userPayload);
    try {
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

  async login({ username, password }: UserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user)
      throw new HttpException(
        'Validation error: Invalid username',
        HttpStatus.NOT_FOUND,
      );

    const isValid = await user.verifyPassword(password);
    if (!isValid)
      throw new HttpException(
        'Validation error: invalid password!',
        HttpStatus.BAD_REQUEST,
      );

    return user.toResponseObject({ message: 'login successfully' });
  }
}
