import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// export const User = (...args: string[]) => SetMetadata('user', args);

export const UserPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // console.log('======', data, req.user);
    return data ? req.user[data] : req.user;
  },
);

// interface Baba {
//   id: string;
//   fake: string;
//   boy: string;
// }
