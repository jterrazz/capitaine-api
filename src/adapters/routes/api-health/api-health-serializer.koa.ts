import { StatusCodes } from 'http-status-codes';
import { RouterContext } from 'koa-router';

import { ApiHealth } from '../../../domain/models/api-health.js';

import { KoaSerializer } from '../serializer.koa.js';

export const apiHealthSerializerKoa: KoaSerializer<ApiHealth> = (
    ctx: RouterContext,
    apiStatus: ApiHealth,
) => {
    ctx.status = StatusCodes.OK;
    ctx.body = {
        message: apiStatus.message,
        status: apiStatus.status,
        time: apiStatus.time.toISOString(),
        version: apiStatus.version,
    };
};
