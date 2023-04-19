import {
  createParamDecorator,
  InternalServerErrorException,
  ExecutionContext,
} from '@nestjs/common';

// tslint:disable:variable-name

/**
 * Plucks "user" object assigned to request
 * through the passport middleware
 * (decorator)
 */
export const RequestUser = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;
  if (!user) {
    throw new InternalServerErrorException();
  }
  return key ? user[key] : user;
});
