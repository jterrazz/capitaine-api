import { FunctionalError } from '@domain/errors/functional.error';
import { TechnicalError } from '@domain/errors/technical.error';

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
