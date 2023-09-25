import { GetHealthController } from '@domain/controllers/get-health.controller';
import { ApiHealth } from '@domain/models/api-health/api-health';

export const getHealthControllerFactory = (
    getHealthMetadata: () => ApiHealth,
): GetHealthController => {
    return async () => {
        return getHealthMetadata();
    };
};
