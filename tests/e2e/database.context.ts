import { container } from '../../src/container/container';

export const databaseContextFactory = () => {
    return container.resolve('database');
};
