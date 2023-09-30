import { mock } from 'jest-mock-extended';

import { getUserUseCaseFactory } from '@application/get-user.use-case';

import { NotFoundError } from '@domain/errors/functionnal/not-found.error';
import { createMockOfUser } from '@domain/models/__fixtures__/user.mock';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories';

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
