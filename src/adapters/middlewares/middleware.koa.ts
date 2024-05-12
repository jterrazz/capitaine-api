import { KoaContext } from '../routes/deserializer.koa.js';

export interface KoaMiddleware {
    (ctx: KoaContext, next: () => Promise<CallableFunction>): Promise<void>;
}
