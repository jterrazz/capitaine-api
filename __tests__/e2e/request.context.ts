import request from 'supertest';

import { container } from '../../src/container/container.js';

export const requestContextFactory = () => {
    return request.agent(container.resolve('server').callback());
};
