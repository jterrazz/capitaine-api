import { getUserControllerFactory } from '@application/get-user.use-case';

import { getUserKoaDeserializer } from '@adapters/routes/user/get-user.koa-deserializer';
import { getUserKoaSerializer } from '@adapters/routes/user/get-user.koa-serializer';

import { koaRouteFactory } from '@infrastructure/server/koa-route';

import { container } from '../../injector';

export const getUserByIdKoaRouteFactory = () => {
    const userRepository = container.resolve('repositories').userRepository;
    const logger = container.resolve('logger');

    const getUserController = getUserControllerFactory(userRepository, logger);

    return koaRouteFactory(logger, getUserController, getUserKoaDeserializer, getUserKoaSerializer);
};
