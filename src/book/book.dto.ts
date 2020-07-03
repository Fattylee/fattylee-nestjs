import { Length, IsString, IsLowercase } from 'class-validator';
export class BookDTO {
  @Length(5, 10)
  @IsString()
  @IsLowercase()
  name: string;
}
