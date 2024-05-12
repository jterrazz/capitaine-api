import { ExposedError } from '../../../domain/errors/exposed.error.js';
import { NotFoundError } from '../../../domain/errors/functionnal/not-found.error.js';
import { UnprocessableEntityError } from '../../../domain/errors/functionnal/unprocessable-entity.error.js';
import { TechnicalError } from '../../../domain/errors/technical.error.js';

import { getHttpResponseFromError } from '../get-http-response-from-error.js';

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
