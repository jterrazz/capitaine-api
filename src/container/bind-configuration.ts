import { interfaces } from 'inversify';

import { Configuration, configurationFactory } from '../configuration/configuration.js';

import { Environment } from '../infrastructure/environment.js';

import { Dependency } from './container.js';

export function bindConfiguration(context: interfaces.Context): Configuration {
    return configurationFactory(context.container.get<Environment>(Dependency.Environment));
}
