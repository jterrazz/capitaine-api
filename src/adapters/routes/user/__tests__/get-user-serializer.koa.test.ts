import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { User } from '../../../../domain/models/user.js';

import { getUserSerializerKoa } from '../get-user-serializer.koa.js';

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
        expect(context.body).toStrictEqual({
            email: 'email',
            id: 1,
        });
    });
});
