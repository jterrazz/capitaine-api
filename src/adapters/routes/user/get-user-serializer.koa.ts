import { StatusCodes } from 'http-status-codes';
import { RouterContext } from 'koa-router';

import { User } from '@domain/models/user/user';

import { KoaSerializer } from '@adapters/routes/serializer.koa';

export const getUserSerializerKoa: KoaSerializer<User> = (ctx: RouterContext, user: User) => {
    ctx.status = StatusCodes.OK;
    ctx.body = {
        email: user.email,
        id: user.id,
    };
};
