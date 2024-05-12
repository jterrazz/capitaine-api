import { FunctionalError } from './functional.error.js';
import { TechnicalError } from './technical.error.js';

export class ExposedError extends Error {
    constructor(
        public readonly message: string,
        public readonly cause: FunctionalError | TechnicalError,
    ) {
        super();
    }
}

export const isExposedError = (error: unknown): error is ExposedError => {
    return error instanceof ExposedError;
};
