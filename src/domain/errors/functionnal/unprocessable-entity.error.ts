import { FunctionalError } from '../functional.error.js';

export class UnprocessableEntityError extends FunctionalError {
    constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
        super({
            cause,
            message: message || 'Unprocessable entity error',
            name: 'UNPROCESSABLE_ENTITY_ERROR',
        });
    }
}
