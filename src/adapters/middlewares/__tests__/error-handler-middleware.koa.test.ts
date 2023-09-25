import { mock } from 'jest-mock-extended';
import Router from 'koa-router';

import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functionnal/not-found.error';
import { UnprocessableEntityError } from '@domain/errors/functionnal/unprocessable-entity.error';
import { TechnicalError } from '@domain/errors/technical/technical-error';

import { Logger } from '@ports/logger';

import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler-middleware.koa';

const context = mock<Router.RouterContext>();
const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(mock<Logger>());

describe('errorHandlerKoaMiddleware()', () => {
    test.each([
        new Error(),
        new NotFoundError(),
        new UnprocessableEntityError(),
        new TechnicalError(),
    ])('respond status code 500 when not exposed errors are thrown', async (error) => {
        // Given
        const next = jest.fn().mockRejectedValue(error);

        // When
        await errorHandlerKoaMiddleware(context, next);

        // Then
        expect(context.status).toEqual(500);
        expect(context.body).toEqual({
            message: 'Internal server error',
        });
    });

    test.each([
        [new ExposedError('the_exposed_message', new NotFoundError()), 404],
        [new ExposedError('the_exposed_message', new UnprocessableEntityError()), 422],
    ])(
        'respond the right status when an exposed error is thrown',
        async (givenError, expectedStatus) => {
            // Given
            const next = jest.fn().mockRejectedValue(givenError);

            // When
            await errorHandlerKoaMiddleware(context, next);

            // Then
            expect(context.status).toEqual(expectedStatus);
            expect(context.body).toEqual({
                message: 'the_exposed_message',
            });
        },
    );
});
