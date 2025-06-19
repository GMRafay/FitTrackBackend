import { create } from 'domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data]; // If data is provided, return the specific property
    }
    return request.user; // This will return the user object from the request
  },
);
