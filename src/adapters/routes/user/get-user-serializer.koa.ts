import { StatusCodes } from 'http-status-codes';
import { RouterContext } from 'koa-router';

import { User } from '../../../domain/models/user.js';

import { KoaSerializer } from '../serializer.koa.js';

export const getUserSerializerKoa: KoaSerializer<User> = (ctx: RouterContext, user: User) => {
    ctx.status = StatusCodes.OK;
    ctx.body = {
        email: user.email,
        id: user.id,
    };
};
