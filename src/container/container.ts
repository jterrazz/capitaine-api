import { Container } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Database } from '../ports/database.js';
import { Logger } from '../ports/logger.js';
import { Server } from '../ports/server.js';

import { Environment } from '../infrastructure/environment.js';

import { bindConfiguration } from './bind-configuration.js';
import { bindDatabase } from './bind-database.js';
import { bindLogger } from './bind-logger.js';
import { bindRepositories, Repositories } from './bind-repositories.js';
import { bindServer } from './bind-server.js';
import { bindUseCases, UseCases } from './bind-use-cases.js';

// TODO Abstract interface in left side of assignment
const container = new Container();
const environment = (process.env.NODE_ENV as Environment) || Environment.Development;

export const Dependency = {
    Configuration: Symbol('Configuration'),
    Database: Symbol('Database'),
    // TODO Remove
    Environment: Symbol('Environment'),
    Logger: Symbol('Logger'),
    Repositories: Symbol('Repositories'),
    Server: Symbol('Server'),
    UseCases: Symbol('UseCases'),
};

container.bind<Environment>(Dependency.Environment).toConstantValue(environment);
container.bind<Configuration>(Dependency.Configuration).toDynamicValue(bindConfiguration);
container.bind<Logger>(Dependency.Logger).toDynamicValue(bindLogger);
container.bind<Database>(Dependency.Database).toDynamicValue(bindDatabase);
container.bind<UseCases>(Dependency.UseCases).toDynamicValue(bindUseCases); // TODO Do not use container for use cases
container.bind<Server>(Dependency.Server).toDynamicValue(bindServer); // TODO Move to application layer
container.bind<Repositories>(Dependency.Repositories).toDynamicValue(bindRepositories); // TODO Move

export default container;
