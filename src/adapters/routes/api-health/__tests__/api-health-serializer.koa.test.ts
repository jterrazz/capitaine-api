import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { ApiHealth } from '../../../../domain/models/api-health.js';
import { ApiHealthStatus } from '../../../../domain/models/api-health-status.js';

import { useFakeTimers, useRealTimers } from '../../../../../__tests__/helpers/timer.js';
import { apiHealthSerializerKoa } from '../api-health-serializer.koa.js';

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
        expect(context.body).toStrictEqual({
            message: 'message',
            status: 'Up',
            time: '2000-01-01T00:00:00.000Z',
            version: 'version',
        });
    });
});
