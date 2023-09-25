import { GetUserController } from '@domain/controllers/get-user.controller';
import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functionnal/not-found.error';

import { UserRepository } from '@ports/database';
import { Logger } from '@ports/logger';

export const getUserControllerFactory = (
    userRepository: UserRepository,
    logger: Logger,
): GetUserController => {
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
