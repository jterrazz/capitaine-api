import * as z from 'zod';

import { Environment } from '../../infrastructure/environment.js';

export const environmentConfigurationSchema = z.enum([
    Environment.Development,
    Environment.Production,
    Environment.Test,
]);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
