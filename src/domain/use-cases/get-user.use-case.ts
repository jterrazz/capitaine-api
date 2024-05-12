import { Logger } from '../../ports/logger.js';
import { UserRepository } from '../../ports/repositories.js';

import { ExposedError } from '../errors/exposed.error.js';
import { NotFoundError } from '../errors/functionnal/not-found.error.js';
import { User } from '../models/user.js';

import { UseCase } from './use-case.js';

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
