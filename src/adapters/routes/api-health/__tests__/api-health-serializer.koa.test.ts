import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';
import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { ApiHealth } from '@domain/models/api-health';
import { ApiHealthStatus } from '@domain/models/api-health-status';

import { apiHealthSerializerKoa } from '@adapters/routes/api-health/api-health-serializer.koa';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

const context = mock<RouterContext>();

describe('apiHealthSerializerKoa()', () => {
    test('serialize status information', () => {
        // Given
        const apiInformation: ApiHealth = {
            message: 'message',
            status: ApiHealthStatus.Up,
            time: new Date(),
            version: 'version',
        };

        // When
        apiHealthSerializerKoa(context, apiInformation);

        // Then
        expect(context.status).toBe(200);
        expect(context.body).toEqual({
            message: 'message',
            status: 'Up',
            time: '2000-01-01T00:00:00.000Z',
            version: 'version',
        });
    });
});
