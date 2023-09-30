import { GetApiHealthUseCase } from '@application/get-api-health.use-case';
import { GetUserUseCase } from '@application/get-user.use-case';

import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

import { koaRouterFactory } from '@infrastructure/server/koa-router';
import { koaServerFactory } from '@infrastructure/server/server.koa';

export const injectableServerFactory = (
    logger: Logger,
    apiVersion: string,
    useCases: {
        getApiHealthUseCase: GetApiHealthUseCase;
        getUserUseCase: GetUserUseCase;
    },
): Server => {
    const router = koaRouterFactory(logger, apiVersion, useCases);

    return koaServerFactory(logger, router);
};

injectableServerFactory.inject = ['logger', 'apiVersion', 'useCases'] as const;
