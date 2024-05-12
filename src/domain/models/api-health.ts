import { ApiHealthStatus } from './api-health-status.js';

export interface ApiHealth {
    status: ApiHealthStatus;
    message: string;
    time: Date;
    version: string;
}
