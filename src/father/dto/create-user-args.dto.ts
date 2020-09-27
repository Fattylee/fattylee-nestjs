import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';

@ArgsType()
export class CreateUSerArgs {
  @Length(2, 5)
  @Field()
  name: string;

  @Field(() => Int) age: number;
}
