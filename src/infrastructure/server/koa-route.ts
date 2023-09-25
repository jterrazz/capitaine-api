import { Controller } from '@domain/controllers/controller';

import { Logger } from '@ports/logger';

import { KoaDeserializer } from '@adapters/routes/deserializer.koa';
import { readInputKoaFactory } from '@adapters/routes/read-input.koa';
import { KoaSerializer } from '@adapters/routes/serializer.koa';
import ResolvedValue = jest.ResolvedValue;
import Router from 'koa-router';

export const koaRouteFactory = <T extends Controller<any, any>>( // eslint-disable-line  @typescript-eslint/no-explicit-any
    logger: Logger,
    controller: T,
    deserializer: KoaDeserializer<Parameters<typeof controller>[0]>,
    serializer: KoaSerializer<ResolvedValue<ReturnType<typeof controller>>>,
): Router.IMiddleware => {
    return async (ctx: Router.RouterContext): Promise<void> => {
        const readInput = readInputKoaFactory(logger, ctx);

        const input = await deserializer(readInput);
        const output = await controller(input);

        await serializer(ctx, output);
    };
};
