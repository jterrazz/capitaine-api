import request from 'supertest';

import { container } from '../../src/container/container';

export const requestContextFactory = () => {
    return request.agent(container.resolve('server').callback());
};
