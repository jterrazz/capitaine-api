import { sleep } from '@utils/sleep';

type RetryOptions = {
    tries?: number;
    delay?: number;
    onError?: (error: unknown) => void;
};

export const retry = async <T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
    const { tries = 10, delay = 1000 } = options;

    try {
        return await fn();
    } catch (error) {
        options.onError?.(error);

        if (tries <= 1) {
            throw error;
        }

        await sleep(delay);

        return retry(fn, { delay, tries: tries - 1 });
    }
};
