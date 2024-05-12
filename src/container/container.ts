import { Container } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Database } from '../ports/database.js';
import { Logger } from '../ports/logger.js';
import { Server } from '../ports/server.js';

import { Environment } from '../infrastructure/environment.js';

import Dependency from './dependency.js';
import { injectableConfigurationFactory } from './injectable.configuration.js';
import { injectableDatabaseFactory } from './injectable.database.js';
import { injectableLoggerFactory } from './injectable.logger.js';
import { injectableRepositoriesFactory, Repositories } from './injectable.repositories.js';
import { injectableServerFactory } from './injectable.server.js';
import { injectableUseCasesFactory, UseCases } from './injectable.use-cases.js';

// TODO Abstract interface in left side of assignment
const container = new Container();
const environment = (process.env.NODE_ENV as Environment) || Environment.Development;

container.bind<Environment>(Dependency.Environment).toConstantValue(environment);
container
    .bind<Configuration>(Dependency.Configuration)
    .toDynamicValue(injectableConfigurationFactory);
container.bind<Logger>(Dependency.Logger).toDynamicValue(injectableLoggerFactory);
container.bind<Database>(Dependency.Database).toDynamicValue(injectableDatabaseFactory);
container.bind<Repositories>(Dependency.Repositories).toDynamicValue(injectableRepositoriesFactory); // TODO Do not use container for repositories
container.bind<UseCases>(Dependency.UseCases).toDynamicValue(injectableUseCasesFactory); // TODO Do not use container for use cases
container.bind<Server>(Dependency.Server).toDynamicValue(injectableServerFactory); // TODO Move to application layer

export default container;
