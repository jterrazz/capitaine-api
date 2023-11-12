import { ApiHealth } from '@domain/models/api-health';
import { ApiHealthStatus } from '@domain/models/api-health-status';
import { UseCase } from '@domain/use-cases/use-case';

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
