import { Configuration } from '../../configuration/configuration.js';

import { Database } from '../../ports/database.js';
import { Logger } from '../../ports/logger.js';

import { retry } from '../../utils/retry.js';

import { UseCases } from '../../container/bind-use-cases.js';
import { Container, Dependency } from '../../container/container.js';
import { koaRouterFactory } from '../gateways/http/koa-router.js';
import { koaServerFactory } from '../gateways/http/koa-server.js';

import { Entrypoint } from './entrypoint.js';

export const entrypointHttpFactory = (container: Container): Entrypoint => {
    const logger = container.get<Logger>(Dependency.Logger);
    const configuration = container.get<Configuration>(Dependency.Configuration);
    const database = container.get<Database>(Dependency.Database);
    const useCases = container.get<UseCases>(Dependency.UseCases);

    const connectToDatabase = async () => {
        logger.info('connecting to database');

        await retry(() => database.connect(), {
            onError: (error) => {
                logger.error('failed to connect to database, will try again in 500 ms');
                logger.error(error); // TODO Merge logs
            },
            retries: 20,
            retries_delay: 500,
        });
    };

    const startServer = async () => {
        const router = koaRouterFactory(logger, configuration.APPLICATION.VERSION, useCases);
        const server = koaServerFactory(logger, router);

        await server.start(configuration.APPLICATION.SERVER.PORT);
    };

    return {
        start: async () => {
            logger.info(`starting HTTP entrypoint with environment <${configuration.ENVIRONMENT}>`);

            await connectToDatabase();
            await startServer();

            logger.info(
                `started HTTP entrypoint on port <${configuration.APPLICATION.SERVER.PORT}>`,
            );
        },
    };
};
