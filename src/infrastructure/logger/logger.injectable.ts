import { Configuration } from '@configuration/configuration';

import { Environment } from '@domain/environment';

import { winstonLoggerFactory } from '@infrastructure/logger/winston.logger';

export const injectableLoggerFactory = (environment: Environment, configuration: Configuration) => {
    return winstonLoggerFactory(environment, configuration.APPLICATION.LOGGER.LEVEL);
};

injectableLoggerFactory.inject = ['environment', 'configuration'] as const;
