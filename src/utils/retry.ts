import { sleep } from './sleep.js';

type RetryOptions = {
    retries?: number;
    retries_delay?: number;
    onError?: (error: unknown) => void;
};

export const retry = async <T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
    const { retries = 10, retries_delay = 1000 } = options;

    try {
        return await fn();
    } catch (error) {
        options.onError?.(error);

        if (retries <= 1) {
            throw error;
        }

        await sleep(retries_delay);

        return retry(fn, { retries: retries - 1, retries_delay: retries_delay });
    }
};
