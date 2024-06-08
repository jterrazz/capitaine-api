import { entrypointHttpFactory } from './application/entrypoints/entrypoint.http.js';

import { Logger } from './ports/logger.js';

import container, { Dependency } from './container/container.js';

import 'reflect-metadata';

export const start = async () => {
    const logger = container.get<Logger>(Dependency.Logger);
    const httpEntrypoint = entrypointHttpFactory(container);

    try {
        await httpEntrypoint.start();
    } catch (error) {
        logger.error(error);
    }
};

void start().then();
