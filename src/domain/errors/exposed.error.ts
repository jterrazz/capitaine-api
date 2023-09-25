import { FunctionalError } from '@domain/errors/functionnal/functional-error';
import { TechnicalError } from '@domain/errors/technical/technical-error';

export class ExposedError extends Error {
    constructor(
        public readonly message: string,
        public readonly cause: FunctionalError | TechnicalError,
    ) {
        super();
    }
}
