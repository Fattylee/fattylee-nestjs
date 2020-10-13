import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    let req = ctx.switchToHttp().getRequest();
    if (!req) {
      req = GqlExecutionContext.create(ctx).getContext();
    }
    return data ? req.user[data] : req.user;
  },
);

// createParamDecorator((data, [p, a, ct, info]));
