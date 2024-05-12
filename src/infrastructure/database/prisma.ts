import { PrismaClient } from '@prisma/client';

import { Database } from '../../ports/database.js';
import { Logger } from '../../ports/logger.js';

import { prismaDatabaseFactory } from './database.prisma.js';
import { prismaClientFactory } from './prisma-client.js';
import { prismaLoggerFactory } from './prisma-logger.js';

export class PrismaFactory {
    private static database: Database;
    private static prismaClient: PrismaClient;

    // Unique instance of Prisma database
    public static getDatabase(databaseUrl: string, logger: Logger): Database {
        if (!PrismaFactory.database) {
            const prismaClient = this.getPrismaClient(databaseUrl, logger);

            PrismaFactory.database = prismaDatabaseFactory(prismaClient, logger);
        }

        return PrismaFactory.database;
    }

    // Unique instance of Prisma client
    public static getPrismaClient(databaseUrl: string, logger: Logger): PrismaClient {
        if (!PrismaFactory.prismaClient) {
            const prismaLogger = prismaLoggerFactory(logger);
            PrismaFactory.prismaClient = prismaClientFactory(databaseUrl, prismaLogger);
        }

        return PrismaFactory.prismaClient;
    }
}
