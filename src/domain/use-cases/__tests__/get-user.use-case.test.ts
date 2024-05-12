import { mock } from 'jest-mock-extended';

import { Logger } from '../../../ports/logger.js';
import { UserRepository } from '../../../ports/repositories.js';

import { NotFoundError } from '../../errors/functionnal/not-found.error.js';
import { createMockOfUser } from '../../models/__fixtures__/user.mock.js';
import { getUserUseCaseFactory } from '../get-user.use-case.js';

const logger = mock<Logger>();
const user = createMockOfUser();

describe('getUserUseCaseFactory()', () => {
    test('return a user', async () => {
        // Given
        const userRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(user),
        });

        // When
        const getUserUseCase = getUserUseCaseFactory(userRepository, logger);
        const userResult = await getUserUseCase(1);

        // Then
        expect(userResult).toEqual(user);
    });

    test('throw an error if user is not found', async () => {
        // Given
        const userRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(null),
        });

        // When
        const getUserUseCase = getUserUseCaseFactory(userRepository, logger);
        const ft = () => getUserUseCase(1);

        // Then
        await expect(ft).rejects.toThrow(
            expect.objectContaining({
                cause: expect.any(NotFoundError),
                message: 'User not found',
            }),
        );
    });
});
