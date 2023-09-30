import { UseCase } from '@application/use-case';

import { ApiHealth } from '@domain/models/api-health/api-health';
import { ApiHealthStatus } from '@domain/models/api-health/api-health-status';

export type GetApiHealthUseCase = UseCase<void, ApiHealth>;

export const getApiHealthUseCaseFactory = (apiVersion: string): GetApiHealthUseCase => {
    return async () => {
        return {
            message: 'Hello World!',
            status: ApiHealthStatus.Up,
            time: new Date(),
            version: apiVersion,
        };
    };
};
