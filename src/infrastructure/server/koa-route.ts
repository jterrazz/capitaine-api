import Router from 'koa-router';

import { UseCase } from '@domain/use-cases/use-case';

import { Logger } from '@ports/logger';

import { KoaDeserializer } from '@adapters/routes/deserializer.koa';
import { readInputKoaFactory } from '@adapters/routes/read-input.koa';
import { KoaSerializer } from '@adapters/routes/serializer.koa';

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
