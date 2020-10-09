// import { NewVideoInput } from 'src/graphql';
import { IsNotEmpty } from 'class-validator';
import { NewVideoInput } from 'src/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class VideoDTO extends NewVideoInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  authorId: string;
}

export const FatBody = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return data ? req.body[data] : req.body;
});
