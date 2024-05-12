// Mock the console to capture log messages

import { LoggerLevel } from '../../../ports/logger.js';

import { Environment } from '../../environment.js';
import { winstonLoggerFactory } from '../logger.winston.js';

const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation();

beforeEach(() => {
    stdoutSpy.mockClear();
});

describe('logger', () => {
    test('output JSON format in production environment', () => {
        // Given
        const logger = winstonLoggerFactory(Environment.Production, LoggerLevel.Debug);

        // When
        logger.info('Test message in production');

        // Then
        const loggedMessage = JSON.parse(stdoutSpy.mock.calls[0][0] as string);
        expect(loggedMessage.level).toBe('info');
        expect(loggedMessage.message).toBe('Test message in production');
    });

    test('output colored text format in development environment', () => {
        // Given
        const logger = winstonLoggerFactory(Environment.Development, LoggerLevel.Debug);

        // When
        logger.info('Test message in development');

        // Then
        const loggedMessage = stdoutSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toMatch(/info/);
        expect(loggedMessage).toMatch(/Test message in development/);
        // eslint-disable-next-line no-control-regex
        expect(loggedMessage).toMatch(/\u001b\[.*?m/g); // Detect ANSI color codes
    });
});
