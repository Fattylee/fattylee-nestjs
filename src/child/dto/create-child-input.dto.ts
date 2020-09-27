import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChildInput {
  @Field() name: string;
}
