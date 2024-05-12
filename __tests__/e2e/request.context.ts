import request from 'supertest';

import { Server } from '../../src/ports/server.js';

import container from '../../src/container/container.js';
import Dependency from '../../src/container/container.js';

export const requestContextFactory = () => {
    return request.agent(container.get<Server>(Dependency.Server).callback() as any);
};
