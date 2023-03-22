import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(data);
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
