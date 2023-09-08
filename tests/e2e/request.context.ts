import request from 'supertest';

import { container } from '../../src/container/injector';

export const requestContextFactory = () => {
    return request.agent(container.resolve('server').callback());
};
