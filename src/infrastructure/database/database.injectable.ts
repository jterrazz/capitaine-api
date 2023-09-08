import { Configuration } from '@configuration/configuration';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

import { PrismaFactory } from '@infrastructure/database/prisma';

export const injectableDatabaseFactory = (
    configuration: Configuration,
    logger: Logger,
): Database => {
    return PrismaFactory.getDatabase(configuration.APPLICATION.DATABASE.URL, logger);
};

injectableDatabaseFactory.inject = ['configuration', 'logger'] as const;
