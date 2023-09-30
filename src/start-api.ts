import { container } from './container/container';

import { apiFactory } from './api';

export const startApi = async () => {
    const logger = container.resolve('logger');

    const api = apiFactory(
        container.resolve('configuration'),
        logger,
        container.resolve('database'),
        container.resolve('server'),
    );

    try {
        await api.start();
    } catch (error) {
        logger.error(error);
    }
};

void startApi().then(); // eslint-disable-line promise/valid-params
