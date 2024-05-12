import { PrismaClient } from '@prisma/client';

import { prismaClientFactory } from '../prisma-client.js';
import { PrismaLogger } from '../prisma-logger.js';

let prismaEventHandlers: Record<string, CallableFunction> = {};

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        $on: jest.fn((event, callback) => {
            prismaEventHandlers[event] = callback;
        }),
    })),
}));

beforeEach(() => {
    jest.clearAllMocks();
    prismaEventHandlers = {};
});

describe('PrismaClient', () => {
    const databaseUrl = 'the-database-url';
    const prismaLogger: PrismaLogger = jest.fn();

    test('create a new PrismaClient instance with the provided database URL', () => {
        // Given - When
        prismaClientFactory(databaseUrl, prismaLogger);

        // Then
        expect(process.env['DATABASE_URL']).toBe(databaseUrl);
        expect(PrismaClient).toHaveBeenCalledTimes(1);
    });

    test.each(['query', 'info', 'warn', 'error'])(
        'log information when the <%s> event is emitted',
        (level) => {
            // Given
            const message = 'the-message';
            prismaClientFactory(databaseUrl, prismaLogger);

            // When
            prismaEventHandlers[level]({ message, query: message });

            // Then
            expect(prismaLogger).toHaveBeenCalledWith(level, message);
        },
    );
});
