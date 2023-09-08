import * as z from 'zod';

import { Environment } from '@domain/environment';

export const environmentConfigurationSchema = z.enum([
    Environment.Development,
    Environment.Production,
    Environment.Test,
]);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
