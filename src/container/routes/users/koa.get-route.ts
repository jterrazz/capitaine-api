import { getUserControllerFactory } from '@application/get-user.use-case';

import { getUserDeserializerKoa } from '@adapters/routes/user/get-user-deserializer.koa';
import { getUserSerializerKoa } from '@adapters/routes/user/get-user-serializer.koa';

import { koaRouteFactory } from '@infrastructure/server/koa-route';

import { container } from '../../injector';

export const getUserByIdKoaRouteFactory = () => {
    const userRepository = container.resolve('repositories').userRepository;
    const logger = container.resolve('logger');

    const getUserController = getUserControllerFactory(userRepository, logger);

    return koaRouteFactory(logger, getUserController, getUserDeserializerKoa, getUserSerializerKoa);
};
