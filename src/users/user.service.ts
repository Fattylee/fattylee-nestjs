import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './dto/user.dto';
import { UserResponseDTO } from './user-response.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async fetchAUser(id: string) {
    const user = await this.userRepo.findOne(id, {
      relations: ['bookmarks', 'comments', 'ideas'],
    });

    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return user.toResponseObject({ showToken: false });
  }

  async getUsers(page = 1, amount = 25): Promise<UserRO[]> {
    if (page < 1 || amount < 1)
      throw new HttpException(
        'Page/amount number must be greater than 0',
        HttpStatus.BAD_REQUEST,
      );

    const users = await this.userRepo.find({
      relations: ['ideas', 'bookmarks', 'comments'],
      take: amount,
      skip: amount * (page - 1),
    });

    return users.map(user => {
      return user.toResponseObject({ showToken: false });
    });
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

    return user.toResponseObject({
      message: 'login successfully',
    });
  }
}
