import { IsString, IsNumber, Length, IsEmail } from 'class-validator';

export class CreateCatDTO {
  @IsString()
  @IsEmail()
  name: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  age: number;

  @IsString()
  @Length(2, 5)
  breed: string;
}
