import { Controller } from '@domain/controllers/controller';
import { ApiHealth } from '@domain/models/api-health/api-health';

export type GetHealthController = Controller<void, ApiHealth>;
