import { createInjector } from 'typed-inject';

import { injectableConfigurationFactory } from '@configuration/configuration.injectable';

import { Environment } from '@domain/environment';

import { injectableDatabaseFactory } from '@infrastructure/database/database.injectable';
import { injectableRepositoriesFactory } from '@infrastructure/database/repositories/repositories.injectable';
import { injectableLoggerFactory } from '@infrastructure/logger/logger.injectable';
import { injectableServerFactory } from '@infrastructure/server/server.injectable';

import packageJson from '../../package.json';

export const container = createInjector()
    // Values
    .provideValue('environment', process.env.NODE_ENV || Environment.Development)
    .provideValue('version', packageJson.version)

    // Application
    .provideFactory('configuration', injectableConfigurationFactory)
    .provideFactory('logger', injectableLoggerFactory)
    .provideFactory('database', injectableDatabaseFactory)

    // Repositories
    .provideFactory('repositories', injectableRepositoriesFactory)

    // Server
    .provideFactory('server', injectableServerFactory);
