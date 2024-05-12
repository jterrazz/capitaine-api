import {
    ApplicationConfiguration,
    applicationConfigurationSchema,
} from './schemas/application.schema.js';

import {
    EnvironmentConfiguration,
    environmentConfigurationSchema,
} from './schemas/environment.schema.js';

export type Configuration = {
    APPLICATION: ApplicationConfiguration;
    ENVIRONMENT: EnvironmentConfiguration;
    // SERVICES: ServicesConfiguration;
};
import { createRequire } from 'module';

export const configurationFactory = (environment: string): Configuration => {
    process.env.NODE_CONFIG_DIR = './src/configuration/values';

    const require = createRequire(import.meta.url);

    const config = require('config'); // eslint-disable-line @typescript-eslint/no-var-requires
    const versionFromPackage = process.env.npm_package_version || '42'; // TODO;

    const applicationConfiguration = config.get('APPLICATION') as object;
    // const servicesConfiguration = config.get('SERVICES') as object;

    return {
        APPLICATION: applicationConfigurationSchema.parse({
            ...applicationConfiguration,
            VERSION: versionFromPackage,
        }),
        ENVIRONMENT: environmentConfigurationSchema.parse(environment),
        // SERVICES: servicesConfigurationSchema.parse(servicesConfiguration),
    };
};
