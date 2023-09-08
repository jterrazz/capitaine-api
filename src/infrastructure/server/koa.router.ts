import Router from 'koa-router';

import { Logger } from '@ports/logger';

import { apiVersionKoaMiddlewareFactory } from '@adapters/middlewares/api-version.koa-middleware';
import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler.koa-middleware';

import { getHealthKoaRouteFactory } from '../../container/routes/health/koa.get-route';
import { getUserByIdKoaRouteFactory } from '../../container/routes/users/koa.get-route';

export const koaRouterFactory = (logger: Logger, version: string): Router => {
    logger.debug('creating koa router');

    const router = new Router();

    const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(version);
    const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(logger);

    const getHealthKoaRoute = getHealthKoaRouteFactory();
    const getUserByIdKoaRoute = getUserByIdKoaRouteFactory();

    router
        .use(errorHandlerKoaMiddleware)
        .use(apiVersionKoaMiddleware)

        // HEALTH
        .get('/health', getHealthKoaRoute)

        // USERS
        .get('/users/:id', getUserByIdKoaRoute);

    logger.debug('created koa router');

    return router;
};
