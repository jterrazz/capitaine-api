import Router from 'koa-router';

import { isError } from '../../domain/errors/error.js';

import { Logger } from '../../ports/logger.js';

export const errorHandlerKoaMiddlewareFactory = (
    logger: Logger,
    getHttpResponseFromError: (error: Error) => { status: number; message: string },
): Router.IMiddleware => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            logger.debug('error handler middleware caught an error');

            if (!isError(err)) {
                logger.error(`Unexpected error type - ${err}`);
                throw new Error(`Unexpected error type - ${err}`);
            }

            const { status, message } = getHttpResponseFromError(err);

            ctx.status = status;
            ctx.body = {
                message,
            };

            logger.error(err);
        }
    };
};
