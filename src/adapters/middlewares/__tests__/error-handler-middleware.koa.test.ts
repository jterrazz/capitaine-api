import { mock } from 'jest-mock-extended';
import Router from 'koa-router';

import { Logger } from '@ports/logger';

import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler-middleware.koa';

const logger = mock<Logger>();
const context = mock<Router.RouterContext>();
const next = jest.fn().mockRejectedValue(new Error());

describe('errorHandlerKoaMiddleware()', () => {
    test('set context with a status and message', async () => {
        // Given
        const status = 200;
        const message = 'the_message';
        const getHttpResponseFromError = () => ({ message, status });

        // When
        const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(
            logger,
            getHttpResponseFromError,
        );
        await errorHandlerKoaMiddleware(context, next);

        // Then
        expect(context.status).toEqual(status);
        expect(context.body).toEqual({
            message,
        });
    });
});
