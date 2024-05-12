import { interfaces } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Environment } from '../infrastructure/environment.js';
import { winstonLoggerFactory } from '../infrastructure/logger/logger.winston.js';

import Dependency from './dependency.js';

export const injectableLoggerFactory = (context: interfaces.Context) => {
    const environment = (process.env.NODE_ENV as Environment) || Environment.Development;

    return winstonLoggerFactory(
        environment,
        context.container.get<Configuration>(Dependency.Configuration).APPLICATION.LOGGER.LEVEL,
    );
};
