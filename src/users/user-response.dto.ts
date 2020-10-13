import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentEntity } from 'src/comment/comment.entity';

export class UserResponseDTO {
  id: string;

  username: string;

  created: Date;

  message?: string;

  token?: string;

  bookmarks?: IdeaEntity[];

  ideas?: IdeaEntity[];

  comments?: CommentEntity[];
}
