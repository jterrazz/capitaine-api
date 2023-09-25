type TechnicalErrorName = 'INTERNAL_SERVER_ERROR';

export class TechnicalError extends Error {
    public cause?: Error;

    constructor({
        name,
        message,
        cause,
    }: {
        name?: TechnicalErrorName;
        message?: string;
        cause?: Error;
    } = {}) {
        super();
        this.name = name || 'INTERNAL_SERVER_ERROR';
        this.message = message || 'Internal server error';
        this.cause = cause;
    }
}

export const isTechnicalError = (error: unknown): error is TechnicalError => {
    return error instanceof TechnicalError;
};
