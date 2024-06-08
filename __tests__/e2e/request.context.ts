import request from 'supertest';

import { HttpServer } from '../../src/ports/server.js';

import container from '../../src/container/container.js';
import Dependency from '../../src/container/container.js';

export const requestContextFactory = () => {
    return request.agent(container.get<HttpServer>(Dependency.Server).callback() as any);
};
