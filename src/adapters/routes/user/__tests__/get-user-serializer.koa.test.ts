import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { User } from '@domain/models/user';

import { getUserSerializerKoa } from '@adapters/routes/user/get-user-serializer.koa';

const context = mock<RouterContext>();

describe('getUserSerializerKoa()', () => {
    test('serialize user', () => {
        // Given
        const user: User = {
            email: 'email',
            id: 1,
        };

        // When
        getUserSerializerKoa(context, user);

        // Then
        expect(context.status).toBe(200);
        expect(context.body).toEqual({
            email: 'email',
            id: 1,
        });
    });
});
