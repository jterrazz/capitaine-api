import { getHealthControllerFactory } from '@application/get-health.use-case';

import { defaultKoaDeserializer } from '@adapters/routes/default.koa-deserializer';
import { healthKoaSerializer } from '@adapters/routes/health/health.koa-serializer';

import { getHealthMetadataFactory } from '@infrastructure/health/get-health-metadata';
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
        defaultKoaDeserializer,
        healthKoaSerializer,
    );
};
