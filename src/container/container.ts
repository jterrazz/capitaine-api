import { createInjector } from 'typed-inject';

import { Environment } from '@infrastructure/environment';

import packageJson from '../../package.json';

import { injectableConfigurationFactory } from './injectable.configuration';
import { injectableDatabaseFactory } from './injectable.database';
import { injectableLoggerFactory } from './injectable.logger';
import { injectableRepositoriesFactory } from './injectable.repositories';
import { injectableServerFactory } from './injectable.server';
import { injectableUseCasesFactory } from './injectable.use-cases';

const environment = (process.env.NODE_ENV as Environment) || Environment.Development;

export const container = createInjector()
    // Configuration
    .provideValue('environment', environment)
    .provideValue('apiVersion', packageJson.version)
    .provideFactory('configuration', injectableConfigurationFactory)

    // Infrastructure
    .provideFactory('logger', injectableLoggerFactory)
    .provideFactory('database', injectableDatabaseFactory)
    .provideFactory('repositories', injectableRepositoriesFactory)

    // Application
    .provideFactory('useCases', injectableUseCasesFactory)

    // Server
    .provideFactory('server', injectableServerFactory);
