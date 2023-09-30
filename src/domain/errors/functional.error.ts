type FunctionalErrorName = 'NOT_FOUND_ERROR' | 'UNPROCESSABLE_ENTITY_ERROR';

export class FunctionalError extends Error {
    public cause?: unknown;

    constructor({
        name,
        message,
        cause,
    }: {
        name: FunctionalErrorName;
        message: string;
        cause?: unknown;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}
