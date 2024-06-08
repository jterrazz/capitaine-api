import Koa from 'koa';
import Router from 'koa-router';

import { Logger } from '../../../ports/logger.js';

export const koaServerFactory = (logger: Logger, router: Router) => {
    logger.debug('initializing koa server');

    const koa = new Koa();

    koa.use(router.routes()).use(router.allowedMethods());

    logger.debug('initialized koa server');

    return {
        callback: () => koa.callback(),
        start: async (port) => {
            koa.listen(port, () => {
                logger.info(`app is listening on port <${port}>`);
            });
        },
    };
};
