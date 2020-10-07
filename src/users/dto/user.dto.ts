import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @Length(5)
  password: string;
}

export interface UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  message?: string;
}
