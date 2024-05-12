import * as z from 'zod';

import { LoggerLevel } from '../../ports/logger.js';

export const applicationConfigurationSchema = z.object({
    DATABASE: z.object({
        URL: z.string(),
    }),
    LOGGER: z.object({
        LEVEL: z.nativeEnum(LoggerLevel),
    }),
    SERVER: z.object({
        PORT: z.string().regex(/^\d+$/).transform(Number),
    }),
    VERSION: z.string(),
});

export type ApplicationConfiguration = z.infer<typeof applicationConfigurationSchema>;
