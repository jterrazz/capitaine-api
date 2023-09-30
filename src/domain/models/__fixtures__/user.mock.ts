import { User } from '@domain/models/user';

export const createMockOfUser = (partialUser: Partial<User> = {}) => ({
    email: 'john.doe@example.com',
    id: 1,
    ...partialUser,
});
