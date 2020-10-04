import { IsString, Length, IsNotEmpty } from 'class-validator';

export class IdeaDTO {
  @IsString()
  @IsNotEmpty()
  idea: string;

  @IsString()
  @Length(5)
  description: string;
}
