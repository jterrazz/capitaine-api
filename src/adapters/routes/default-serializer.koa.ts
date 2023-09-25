import { StatusCodes } from 'http-status-codes';
import { RouterContext } from 'koa-router';

import { KoaSerializer } from '@adapters/routes/serializer.koa';

export const defaultSerializerKoa: KoaSerializer<void> = (ctx: RouterContext) => {
    ctx.status = StatusCodes.OK;
};
