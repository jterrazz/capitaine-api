import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functionnal/not-found.error';
import { UnprocessableEntityError } from '@domain/errors/functionnal/unprocessable-entity.error';
import { TechnicalError } from '@domain/errors/technical.error';

import { getHttpResponseFromError } from '@infrastructure/http/get-http-response-from-error';

describe('getHttpResponseFromError()', () => {
    test.each([
        // Given
        new Error(),
        new NotFoundError(),
        new UnprocessableEntityError(),
        new TechnicalError(),
    ])('respond status code 500 when not exposed errors are thrown', (error) => {
        // When
        const { message, status } = getHttpResponseFromError(error);

        // Then
        expect(status).toEqual(500);
        expect(message).toEqual('Internal server error');
    });

    test.each([
        // Given
        [new ExposedError('the_exposed_message', new NotFoundError()), 404],
        [new ExposedError('the_exposed_message', new UnprocessableEntityError()), 422],
    ])(
        'respond the right status when an exposed error is thrown',
        async (givenError, expectedStatus) => {
            // When
            const { message, status } = getHttpResponseFromError(givenError);

            // Then
            expect(status).toEqual(expectedStatus);
            expect(message).toEqual('the_exposed_message');
        },
    );
});
