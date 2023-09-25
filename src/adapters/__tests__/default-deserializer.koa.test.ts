import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { Logger } from '@ports/logger';

import { defaultDeserializerKoa } from '@adapters/routes/default-deserializer.koa';
import { readInputKoaFactory } from '@adapters/routes/read-input.koa';

const context = mock<RouterContext>();

describe('defaultKoaDeserializer()', () => {
    test('return 200 status code', () => {
        // Given
        const readInput = readInputKoaFactory(mock<Logger>(), context);

        // When
        const data = defaultDeserializerKoa(readInput);

        // Then
        expect(data).toBeUndefined();
    });
});
