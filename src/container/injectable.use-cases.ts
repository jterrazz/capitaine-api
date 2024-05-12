import { interfaces } from 'inversify';

import { Configuration } from '../configuration/configuration.js';

import { getApiHealthUseCaseFactory } from '../domain/use-cases/get-api-health.use-case.js';
import { getUserUseCaseFactory } from '../domain/use-cases/get-user.use-case.js';

import { Logger } from '../ports/logger.js';

import Dependency from './dependency.js';
import { Repositories } from './injectable.repositories.js';

export const injectableUseCasesFactory = (context: interfaces.Context) => {
    const configuration = context.container.get<Configuration>(Dependency.Configuration);
    const logger = context.container.get<Logger>(Dependency.Logger);
    const repositories = context.container.get<Repositories>(Dependency.Repositories);

    const getApiHealthUseCase = getApiHealthUseCaseFactory(configuration.APPLICATION.VERSION);
    const getUserUseCase = getUserUseCaseFactory(repositories.userRepository, logger);

    return {
        getApiHealthUseCase,
        getUserUseCase,
    };
};

export interface UseCases {
    getApiHealthUseCase: ReturnType<typeof getApiHealthUseCaseFactory>;
    getUserUseCase: ReturnType<typeof getUserUseCaseFactory>;
}
