import { interfaces } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { Logger } from '../ports/logger.js';

import { PrismaFactory } from '../infrastructure/database/prisma.js';
import { prismaUserRepositoryFactory } from '../infrastructure/repositories/user-repository.prisma.js';

import { Dependency } from './container.js';

export const bindRepositories = (context: interfaces.Context) => {
    const prismaClient = PrismaFactory.getPrismaClient(
        context.container.get<Configuration>(Dependency.Configuration).APPLICATION.DATABASE.URL,
        context.container.get<Logger>(Dependency.Logger),
    );

    return {
        userRepository: prismaUserRepositoryFactory(
            context.container.get<Logger>(Dependency.Logger),
            prismaClient,
        ),
    };
};

export interface Repositories {
    userRepository: ReturnType<typeof prismaUserRepositoryFactory>;
}
