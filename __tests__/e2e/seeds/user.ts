import { User } from '@prisma/client';
import * as crypto from 'crypto';

import { container } from '../../../src/container/container.js';

export const dangerouslySeedUser = async (
    { email } = {
        email: `${crypto.randomBytes(8).toString('hex')}@example.com`,
    },
): Promise<User> => {
    const userRepository = container.resolve('repositories').userRepository;
    const persistedUser = await userRepository.create(email);

    if (!persistedUser) {
        throw new Error('Could not seed user');
    }

    return {
        email,
        id: persistedUser.id,
    };
};
