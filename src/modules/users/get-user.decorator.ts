import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, req): any => {
  const { user } = req.args[0];

  return data ? user && user[data] : user;
});
