import { ApiHealth } from '@domain/models/api-health/api-health';
import { ApiHealthStatus } from '@domain/models/api-health/api-health-status';

export const getHealthMetadataFactory = (apiVersion: string): (() => ApiHealth) => {
    return () => ({
        message: 'Hello World!',
        status: ApiHealthStatus.Up,
        time: new Date(),
        version: apiVersion,
    });
};
