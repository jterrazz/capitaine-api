import { useFakeTimers, useRealTimers } from '../../../__tests__/helpers/timer.js';
import { sleep } from '../sleep.js';

const simulateSleep = async (sleepDuration: number, advanceTimeBy: number) => {
    const sleepPromise = sleep(sleepDuration);
    const promiseResolved = jest.fn();

    void sleepPromise.then(promiseResolved);

    // Advance timers by the specified time
    jest.advanceTimersByTime(advanceTimeBy);

    // Allow pending promises to resolve or reject
    await Promise.resolve();

    return { promiseResolved };
};

beforeEach(async () => {
    useFakeTimers();
});

afterEach(() => {
    useRealTimers();
});

describe('sleep', () => {
    test('resolve after the specified duration', async () => {
        // Given
        const duration = 1000;

        // When
        const { promiseResolved } = await simulateSleep(duration, duration + 10);

        // Then
        expect(promiseResolved).toHaveBeenCalledTimes(1);
    });

    test('does not resolve before the specified duration', async () => {
        // Given
        const duration = 1000;

        // When
        const { promiseResolved } = await simulateSleep(duration, duration - 10);

        // Then
        expect(promiseResolved).not.toHaveBeenCalled();
    });
});
