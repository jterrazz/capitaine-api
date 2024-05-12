import { StatusCodes } from 'http-status-codes';

import { isExposedError } from '../../domain/errors/exposed.error.js';

const INTERNAL_ERROR_MESSAGE = 'Internal server error';
const INTERNAL_ERROR_STATUS = StatusCodes.INTERNAL_SERVER_ERROR;

const ErrorToResponseMap: Array<[string, StatusCodes, string]> = [
    ['NotFoundError', StatusCodes.NOT_FOUND, 'Not found'],
    ['UnprocessableEntityError', StatusCodes.UNPROCESSABLE_ENTITY, 'Unprocessable entity'],
    ['InternalServerError', INTERNAL_ERROR_STATUS, INTERNAL_ERROR_MESSAGE],
];

export const getHttpResponseFromError = (
    error: Error,
): {
    status: StatusCodes;
    message: string;
} => {
    if (!isExposedError(error)) {
        return {
            message: INTERNAL_ERROR_MESSAGE,
            status: INTERNAL_ERROR_STATUS,
        };
    }

    for (const [errorName, status, message] of ErrorToResponseMap) {
        if (error.cause.constructor.name === errorName) {
            return {
                message: error.message ?? message,
                status,
            };
        }
    }

    return {
        message: error.message ?? INTERNAL_ERROR_MESSAGE,
        status: INTERNAL_ERROR_STATUS,
    };
};
