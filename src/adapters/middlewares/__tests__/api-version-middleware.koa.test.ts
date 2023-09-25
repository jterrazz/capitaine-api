import { mock } from 'jest-mock-extended';
import Router from 'koa-router';

import { apiVersionKoaMiddlewareFactory } from '@adapters/middlewares/api-version-middleware.koa';

describe('apiVersionKoaMiddleware()', () => {
    test('set api-version header', async () => {
        // Given
        const apiVersion = '1.0.0';
        const context = mock<Router.RouterContext>();

        // When
        const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(apiVersion);
        await apiVersionKoaMiddleware(context, jest.fn());

        // Then
        expect(context.set).toHaveBeenCalledWith('api-version', apiVersion);
    });
});
