import { UseCase } from '@application/use-case';

import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functionnal/not-found.error';
import { User } from '@domain/models/user';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories';

export type GetUserUseCase = UseCase<number, User>;

export const getUserUseCaseFactory = (
    userRepository: UserRepository,
    logger: Logger,
): GetUserUseCase => {
    return async (id: number) => {
        const user = await userRepository.findById(id);

        if (!user) {
            logger.info(`User with id ${id} not found`);

            throw new ExposedError(
                'User not found',
                new NotFoundError({
                    message: `User with id ${id} not found`,
                }),
            );
        }

        return user;
    };
};
