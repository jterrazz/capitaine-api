import { mock } from '@jterrazz/package-typescript-test';
import Router from 'koa-router';

import { apiVersionKoaMiddlewareFactory } from '../api-version-middleware.koa.js';

describe('apiVersionKoaMiddleware()', () => {
    test('set context with an api-version header', async () => {
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
