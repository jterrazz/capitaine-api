import Router from 'koa-router';

import { GetApiHealthUseCase } from '../../domain/use-cases/get-api-health.use-case.js';
import { GetUserUseCase } from '../../domain/use-cases/get-user.use-case.js';

import { Logger } from '../../ports/logger.js';

import { apiVersionKoaMiddlewareFactory } from '../../adapters/middlewares/api-version-middleware.koa.js';
import { errorHandlerKoaMiddlewareFactory } from '../../adapters/middlewares/error-handler-middleware.koa.js';
import { apiHealthSerializerKoa } from '../../adapters/routes/api-health/api-health-serializer.koa.js';
import { defaultDeserializerKoa } from '../../adapters/routes/default-deserializer.koa.js';
import { getUserDeserializerKoa } from '../../adapters/routes/user/get-user-deserializer.koa.js';
import { getUserSerializerKoa } from '../../adapters/routes/user/get-user-serializer.koa.js';

import { getHttpResponseFromError } from '../http/get-http-response-from-error.js';

import { koaRouteFactory } from './koa-route.js';

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
    const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(
        logger,
        getHttpResponseFromError,
    );

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
