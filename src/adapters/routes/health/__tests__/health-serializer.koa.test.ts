import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';
import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { ApiHealth } from '@domain/models/api-health/api-health';
import { ApiHealthStatus } from '@domain/models/api-health/api-health-status';

import { healthSerializerKoa } from '@adapters/routes/health/health-serializer.koa';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

const context = mock<RouterContext>();

describe('apiStatusKoaSerializer()', () => {
    test('serialize status information', () => {
        // Given
        const apiInformation: ApiHealth = {
            message: 'message',
            status: ApiHealthStatus.Up,
            time: new Date(),
            version: 'version',
        };

        // When
        healthSerializerKoa(context, apiInformation);

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
