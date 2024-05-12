import Router from 'koa-router';
import { ZodObject, ZodRawShape } from 'zod';

import { ExposedError } from '../../domain/errors/exposed.error.js';
import { UnprocessableEntityError } from '../../domain/errors/functionnal/unprocessable-entity.error.js';

import { Logger } from '../../ports/logger.js';

export type InputReaderKoa = <T extends ZodObject<ZodRawShape>>(
    schema: T,
) => ReturnType<T['parse']>;

export const readInputKoaFactory = (logger: Logger, ctx: Router.RouterContext): InputReaderKoa => {
    return (schema: ZodObject<ZodRawShape>) => {
        try {
            return schema.parse({
                params: ctx.params,
            }) as unknown as never;
        } catch (error) {
            logger.info(`request param validation failed: ${JSON.stringify(error)}`);

            throw new ExposedError(
                'Request param validation failed',
                new UnprocessableEntityError({
                    cause: error,
                    message: 'Request param validation failed',
                }),
            );
        }
    };
};
