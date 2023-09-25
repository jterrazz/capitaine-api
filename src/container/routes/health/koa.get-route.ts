import { getHealthControllerFactory } from '@application/get-health.use-case';

import { defaultDeserializerKoa } from '@adapters/routes/default-deserializer.koa';
import { healthSerializerKoa } from '@adapters/routes/health/health-serializer.koa';

import { getHealthMetadataFactory } from '@infrastructure/api-health/get-api-health';
import { koaRouteFactory } from '@infrastructure/server/koa-route';

import { container } from '../../injector';

export const getHealthKoaRouteFactory = () => {
    const logger = container.resolve('logger');
    const version = container.resolve('version');
    const getHealthMetadata = getHealthMetadataFactory(version);
    const getApiStatusController = getHealthControllerFactory(getHealthMetadata);

    return koaRouteFactory(
        logger,
        getApiStatusController,
        defaultDeserializerKoa,
        healthSerializerKoa,
    );
};
