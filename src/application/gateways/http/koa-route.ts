import Router from 'koa-router';

import { UseCase } from '../../../domain/use-cases/use-case.js';

import { Logger } from '../../../ports/logger.js';

import { KoaDeserializer } from '../../../adapters/routes/deserializer.koa.js';
import { readInputKoaFactory } from '../../../adapters/routes/read-input.koa.js';
import { KoaSerializer } from '../../../adapters/routes/serializer.koa.js';

export const koaRouteFactory = <T extends UseCase<any, any>>( // eslint-disable-line  @typescript-eslint/no-explicit-any
    logger: Logger,
    useCase: T,
    deserializer: KoaDeserializer<Parameters<typeof useCase>[0]>,
    serializer: KoaSerializer<Awaited<ReturnType<typeof useCase>>>,
): Router.IMiddleware => {
    return async (ctx: Router.RouterContext): Promise<void> => {
        const readInput = readInputKoaFactory(logger, ctx);

        const input = await deserializer(readInput);
        const output = await useCase(input);

        await serializer(ctx, output);
    };
};
