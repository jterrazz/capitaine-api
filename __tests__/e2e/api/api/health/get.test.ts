import { useFakeTimers, useRealTimers } from '../../../../helpers/timer.js';
import { TestContext } from '../../../context.js';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /api/health', function () {
    test('respond with api health information', async () => {
        // When
        const response = await TestContext.request().get('/api/health');

        // Then
        expect(response.status).toStrictEqual(200);
        expect(response.body).toStrictEqual({
            message: 'Hello World!',
            status: 'Up',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
    });

    test('respond with global headers', async () => {
        // When
        const response = await TestContext.request().get('/api/health');

        // Then
        expect(response.headers['api-version']).toStrictEqual(
            (await import('../../../../../package.json')).default.version,
        );
        expect(response.headers['content-type']).toStrictEqual('application/json; charset=utf-8');
    });
});
