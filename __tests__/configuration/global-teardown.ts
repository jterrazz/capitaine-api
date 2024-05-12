import { TestContext } from '../e2e/context.js';

const globalTeardown = async () => {
    await TestContext.database().disconnect();
};

export default globalTeardown;
