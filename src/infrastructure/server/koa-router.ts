import Router from 'koa-router';

import { GetApiHealthUseCase } from '@application/get-api-health.use-case';
import { GetUserUseCase } from '@application/get-user.use-case';

import { Logger } from '@ports/logger';

import { apiVersionKoaMiddlewareFactory } from '@adapters/middlewares/api-version-middleware.koa';
import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler-middleware.koa';
import { apiHealthSerializerKoa } from '@adapters/routes/api-health/api-health-serializer.koa';
import { defaultDeserializerKoa } from '@adapters/routes/default-deserializer.koa';
import { getUserDeserializerKoa } from '@adapters/routes/user/get-user-deserializer.koa';
import { getUserSerializerKoa } from '@adapters/routes/user/get-user-serializer.koa';

import { koaRouteFactory } from '@infrastructure/server/koa-route';

export const koaRouterFactory = (
    logger: Logger,
    version: string,
    useCases: {
        getApiHealthUseCase: GetApiHealthUseCase;
        getUserUseCase: GetUserUseCase;
    },
): Router => {
    logger.debug('creating koa router');

    const router = new Router();

    // Middlewares
    const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(version);
    const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(logger);

    // Routes
    const getHealthKoaRoute = koaRouteFactory(
        logger,
        useCases.getApiHealthUseCase,
        defaultDeserializerKoa,
        apiHealthSerializerKoa,
    );
    const getUserByIdKoaRoute = koaRouteFactory(
        logger,
        useCases.getUserUseCase,
        getUserDeserializerKoa,
        getUserSerializerKoa,
    );

    router
        .use(errorHandlerKoaMiddleware)
        .use(apiVersionKoaMiddleware)

        // HEALTH
        .get('/api/health', getHealthKoaRoute)

        // USERS
        .get('/users/:id', getUserByIdKoaRoute);

    logger.debug('created koa router');

    return router;
};
