import { createParamDecorator } from '@nestjs/common';

export const BodyWithRefresh = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const refreshToken = request.refreshToken;

  return data ? refreshToken && refreshToken[data] : refreshToken;
});
