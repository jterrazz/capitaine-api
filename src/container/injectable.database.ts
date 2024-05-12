import { interfaces } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Database } from '../ports/database.js';
import { Logger } from '../ports/logger.js';

import { PrismaFactory } from '../infrastructure/database/prisma.js';

import Dependency from './dependency.js';

export const injectableDatabaseFactory = (context: interfaces.Context): Database => {
    return PrismaFactory.getDatabase(
        context.container.get<Configuration>(Dependency.Configuration).APPLICATION.DATABASE.URL,
        context.container.get<Logger>(Dependency.Logger),
    );
};
