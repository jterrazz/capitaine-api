import { FunctionalError } from '@domain/errors/functionnal/functional-error';

export class NotFoundError extends FunctionalError {
    constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
        super({
            cause,
            message: message || 'Not found error',
            name: 'NOT_FOUND_ERROR',
        });
    }
}
