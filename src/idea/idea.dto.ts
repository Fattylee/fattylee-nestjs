import { IsString, Length, IsNotEmpty, MinLength } from 'class-validator';
import { UserRO } from 'src/users/dto/user.dto';

export class IdeaDTO {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  idea: string;

  @IsString()
  @Length(5)
  description: string;
}

export interface IdeaRO {
  id: string;
  idea: string;
  description: string;
  created: Date;
  updated: Date;
  author: UserRO;
  upvotes?: number;
  downvotes?: number;
}
