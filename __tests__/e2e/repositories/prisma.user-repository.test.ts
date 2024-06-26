import { Repositories } from '../../../src/container/bind-repositories.js';
import container from '../../../src/container/container.js';
import Dependency from '../../../src/container/container.js';
import { TestContext } from '../context.js';
import { dangerouslySeedUser } from '../seeds/user.js';

beforeAll(async () => {
    await TestContext.database().connect();
});

describe('Prisma - User Repository', () => {
    const userRepository = container.get<Repositories>(Dependency.Repositories).userRepository;

    describe('findByEmail()', () => {
        test('return null when a user is not found', async () => {
            // Given
            const unknownEmail = 'unknown@example.com';

            // When
            const user = await userRepository.findByEmail(unknownEmail);

            // Then
            expect(user).toBeNull();
        });

        test('return a user when found', async () => {
            // Given
            const seededUser = await dangerouslySeedUser();

            // When
            const user = await userRepository.findByEmail(seededUser.email);

            // Then
            expect(user).toMatchObject(seededUser);
        });
    });

    describe('findById()', () => {
        test('return null when a user is not found', async () => {
            // Given
            const unknownId = -1;

            // When
            const user = await userRepository.findById(unknownId);

            // Then
            expect(user).toBeNull();
        });

        test('return a user when found', async () => {
            // Given
            const seededUser = await dangerouslySeedUser();

            // When
            const user = await userRepository.findById(seededUser.id);

            // Then
            expect(user).toMatchObject(seededUser);
        });
    });
});
