import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

import { koaRouterFactory } from '@infrastructure/server/koa-router';
import { koaServerFactory } from '@infrastructure/server/server.koa';

export const injectableServerFactory = (logger: Logger, version: string): Server => {
    const router = koaRouterFactory(logger, version);

    return koaServerFactory(logger, router);
};

injectableServerFactory.inject = ['logger', 'version'] as const;
