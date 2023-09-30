import { Configuration } from '@configuration/configuration';

import { Environment } from '@infrastructure/environment';
import { winstonLoggerFactory } from '@infrastructure/logger/logger.winston';

export const injectableLoggerFactory = (environment: Environment, configuration: Configuration) => {
    return winstonLoggerFactory(environment, configuration.APPLICATION.LOGGER.LEVEL);
};

injectableLoggerFactory.inject = ['environment', 'configuration'] as const;
