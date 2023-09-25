import { mock } from 'jest-mock-extended';

import { getUserControllerFactory } from '@application/get-user.use-case';

import { NotFoundError } from '@domain/errors/functionnal/not-found.error';
import { createMockOfUser } from '@domain/models/user/__tests__/user.mock';

import { UserRepository } from '@ports/database';
import { Logger } from '@ports/logger';

// TODO Continue checking tests after this file (remove should, remove mockOf, simplify given, get out some shared props)

const mockOfLogger = mock<Logger>();
const mockOfUser = createMockOfUser();

describe('getUserControllerFactory()', () => {
    test('should return a user', async () => {
        // Given
        const mockOfUserRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(mockOfUser),
        });

        // When
        const getUserController = getUserControllerFactory(mockOfUserRepository, mockOfLogger);
        const user = await getUserController(1);

        // Then
        expect(user).toEqual(mockOfUser);
    });

    test('should throw an error if user is not found', async () => {
        // Given
        const mockOfUserRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(null),
        });

        // When
        const getUserController = getUserControllerFactory(mockOfUserRepository, mockOfLogger);
        const ft = () => getUserController(1);

        // Then
        await expect(ft).rejects.toThrow(
            expect.objectContaining({
                cause: expect.any(NotFoundError),
                message: 'User not found',
            }),
        );
    });
});
