import { PrismaClient } from '@prisma/client';

import { Logger } from '../../ports/logger.js';
import { UserRepository } from '../../ports/repositories.js';

export const prismaUserRepositoryFactory = (
    logger: Logger,
    prismaClient: PrismaClient,
): UserRepository => {
    return {
        create: async (email) => {
            logger.debug(`creating user with email: ${email}`);

            const user = await prismaClient.user.create({
                data: {
                    email,
                },
            });

            logger.debug(`created user with email: ${email}`);

            return user;
        },

        findByEmail: async (email: string) => {
            logger.debug(`finding user by email: ${email}`);

            const user = await prismaClient.user.findUnique({
                where: {
                    email,
                },
            });

            logger.debug(`found user by email: ${email}`);

            return user;
        },

        findById: async (id: number) => {
            logger.debug(`finding user by id: ${id}`);

            const user = await prismaClient.user.findUnique({
                where: {
                    id,
                },
            });

            logger.debug(`found user by id: ${id}`);

            return user;
        },
    };
};
