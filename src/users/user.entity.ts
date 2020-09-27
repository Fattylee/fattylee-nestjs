import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { UserResponseDTO } from './user-response.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  get token(): string {
    const { id, username } = this;
    return sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }

  toResponseObject({
    message = 'Successful',
    showToken = true,
  }: {
    showToken?: boolean;
    message?: string;
  } = {}): UserResponseDTO {
    const { id, username, created } = this;
    const response: UserResponseDTO = { id, username, created, message };
    if (showToken) response.token = this.token;

    return response;
  }

  async verifyPassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
