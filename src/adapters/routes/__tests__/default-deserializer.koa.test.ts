import { mock } from 'jest-mock-extended';
import { RouterContext } from 'koa-router';

import { Logger } from '../../../ports/logger.js';

import { defaultDeserializerKoa } from '../default-deserializer.koa.js';
import { readInputKoaFactory } from '../read-input.koa.js';

const context = mock<RouterContext>();

describe('defaultDeserializerKoa()', () => {
    test('return 200 status code', () => {
        // Given
        const readInput = readInputKoaFactory(mock<Logger>(), context);

        // When
        const data = defaultDeserializerKoa(readInput);

        // Then
        expect(data).toBeUndefined();
    });
});
