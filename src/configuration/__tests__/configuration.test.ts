import { configurationFactory } from '@configuration/configuration';

import { Environment } from '@infrastructure/environment';

describe('configuration', () => {
    test('return default values of configuration', async () => {
        // When
        const result = configurationFactory(Environment.Test);

        // Then
        expect(result).toEqual({
            APPLICATION: {
                DATABASE: {
                    URL: expect.stringMatching(/postgresql:\/\/.+/),
                },
                LOGGER: {
                    LEVEL: 'error',
                },
                SERVER: {
                    PORT: 9999,
                },
                VERSION: '1.0.0',
            },
            ENVIRONMENT: 'test',
        });
    });

    test('throw when a required variable is missing', async () => {
        // Given
        const nodeEnv = null;

        // When
        const ft = () => configurationFactory(nodeEnv as unknown as string);

        // Then
        expect(ft).toThrow();
    });
});
