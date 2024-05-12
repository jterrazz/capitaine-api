import { User } from '../user.js';

export const createMockOfUser = (partialUser: Partial<User> = {}) => ({
    email: 'john.doe@example.com',
    id: 1,
    ...partialUser,
});
