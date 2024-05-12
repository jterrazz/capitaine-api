import { ApiHealth } from '../models/api-health.js';
import { ApiHealthStatus } from '../models/api-health-status.js';

import { UseCase } from './use-case.js';

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
