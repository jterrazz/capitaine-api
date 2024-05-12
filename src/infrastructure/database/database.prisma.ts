import { PrismaClient } from '@prisma/client';

import { Database } from '../../ports/database.js';
import { Logger } from '../../ports/logger.js';

export const prismaDatabaseFactory = (prismaClient: PrismaClient, logger: Logger): Database => {
    return {
        connect: async () => {
            logger.debug('connecting to database');
            await prismaClient.$connect();
            logger.debug('connected to database');
        },
        disconnect: async () => {
            logger.debug('disconnecting database');
            await prismaClient.$disconnect();
            logger.debug('disconnected database');
        },
    };
};
