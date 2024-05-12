import { Configuration } from './configuration/configuration.js';

import { Database } from './ports/database.js';
import { Logger } from './ports/logger.js';
import { Server } from './ports/server.js';

import container from './container/container.js';
import Dependency from './container/dependency.js';

import 'reflect-metadata';
import { apiFactory } from './api.js';

export const startApi = async () => {
    const logger = container.get<Logger>(Dependency.Logger);

    const api = apiFactory(
        container.get<Configuration>(Dependency.Configuration),
        logger,
        container.get<Database>(Dependency.Database),
        container.get<Server>(Dependency.Server),
    );

    try {
        await api.start();
    } catch (error) {
        logger.error(error);
    }
};

void startApi().then();
