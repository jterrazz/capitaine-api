import { getApiHealthUseCaseFactory } from '@domain/use-cases/get-api-health.use-case';
import { getUserUseCaseFactory } from '@domain/use-cases/get-user.use-case';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories';

export const injectableUseCasesFactory = (
    apiVersion: string,
    logger: Logger,
    repositories: {
        userRepository: UserRepository;
    },
) => {
    const getApiHealthUseCase = getApiHealthUseCaseFactory(apiVersion);
    const getUserUseCase = getUserUseCaseFactory(repositories.userRepository, logger);

    return {
        getApiHealthUseCase,
        getUserUseCase,
    };
};

injectableUseCasesFactory.inject = ['apiVersion', 'logger', 'repositories'] as const;
