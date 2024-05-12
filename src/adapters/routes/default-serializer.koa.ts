import { StatusCodes } from 'http-status-codes';
import { RouterContext } from 'koa-router';

import { KoaSerializer } from './serializer.koa.js';

export const defaultSerializerKoa: KoaSerializer<void> = (ctx: RouterContext) => {
    ctx.status = StatusCodes.OK;
};
