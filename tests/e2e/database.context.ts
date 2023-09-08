import { container } from '../../src/container/injector';

export const databaseContextFactory = () => {
    return container.resolve('database');
};
