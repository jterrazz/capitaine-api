import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { UnprocessableEntityError } from '@domain/errors/functionnal/unprocessable-entity.error';

import { Logger } from '@ports/logger';

import { readInputKoaFactory } from '@adapters/routes/read-input.koa';
import { getUserDeserializerKoa } from '@adapters/routes/user/get-user-deserializer.koa';

const logger = mock<Logger>();

describe('getUserKoaDeserializer()', () => {
    test('return the user id', () => {
        // Given
        const context = mock<RouterContext>({
            params: {
                id: '1',
            },
        });
        const readInput = readInputKoaFactory(logger, context);

        // When
        const userId = getUserDeserializerKoa(readInput);

        // Then
        expect(userId).toBe(1);
    });

    test('throw an error if the user id is not a number', () => {
        // Given
        const context = mock<RouterContext>({
            params: {
                id: 'a',
            },
        });
        const readInput = readInputKoaFactory(logger, context);

        // When
        const getUserDeserializer = () => getUserDeserializerKoa(readInput);

        // Then
        expect(getUserDeserializer).toThrow(
            expect.objectContaining({
                cause: expect.any(UnprocessableEntityError),
                message: 'Request param validation failed',
            }),
        );
    });

    test('throw an error if the user id is missing', () => {
        // Given
        const context = mock<RouterContext>({
            params: {},
        });
        const readInput = readInputKoaFactory(logger, context);

        // When
        const getUserDeserializer = () => getUserDeserializerKoa(readInput);

        // Then
        expect(getUserDeserializer).toThrow(
            expect.objectContaining({
                cause: expect.any(UnprocessableEntityError),
                message: 'Request param validation failed',
            }),
        );
    });
});
