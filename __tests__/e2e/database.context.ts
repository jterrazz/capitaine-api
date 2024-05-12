import { container } from '../../src/container/container.js';

export const databaseContextFactory = () => {
    return container.resolve('database');
};
