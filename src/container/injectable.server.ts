import { interfaces } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Logger } from '../ports/logger.js';
import { Server } from '../ports/server.js';

import { koaRouterFactory } from '../infrastructure/server/koa-router.js';
import { koaServerFactory } from '../infrastructure/server/server.koa.js';

import Dependency from './dependency.js';
import { UseCases } from './injectable.use-cases.js';

export const injectableServerFactory = (context: interfaces.Context): Server => {
    const logger = context.container.get<Logger>(Dependency.Logger);
    const configuration = context.container.get<Configuration>(Dependency.Configuration);
    const useCases = context.container.get<UseCases>(Dependency.UseCases);

    const router = koaRouterFactory(logger, configuration.APPLICATION.VERSION, useCases);

    return koaServerFactory(logger, router);
};
