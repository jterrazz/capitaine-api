import { Prisma } from '@prisma/client';
import { mock } from 'jest-mock-extended';

import { Logger } from '@ports/logger';

import { prismaLoggerFactory } from '@infrastructure/database/prisma-logger';

const logger = mock<Logger>();

describe('PrismaLogger', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each<[Prisma.LogLevel, keyof Logger]>([
        ['query', 'debug'],
        ['info', 'info'],
        ['warn', 'warn'],
        ['error', 'error'],
    ])('call the correct logger method for log level %s', (level, loggerMethod) => {
        // Given
        const prismaLogger = prismaLoggerFactory(logger);
        const message = `Test message for level: ${level}`;

        // When
        prismaLogger(level, message);

        // Then
        expect(logger[loggerMethod]).toHaveBeenCalledWith(message);
    });
});
