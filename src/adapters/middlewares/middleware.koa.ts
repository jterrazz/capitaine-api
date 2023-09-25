import { KoaContext } from '@adapters/routes/deserializer.koa';

export interface KoaMiddleware {
    (ctx: KoaContext, next: () => Promise<CallableFunction>): Promise<void>;
}
