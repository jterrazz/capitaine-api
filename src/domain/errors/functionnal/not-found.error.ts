import { FunctionalError } from '../functional.error.js';

export class NotFoundError extends FunctionalError {
    constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
        super({
            cause,
            message: message || 'Not found error',
            name: 'NOT_FOUND_ERROR',
        });
    }
}
