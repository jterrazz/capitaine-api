import request from 'supertest';

import { Database } from '../../src/ports/database.js';

import { databaseContextFactory } from './database.context.js';
import { requestContextFactory } from './request.context.js';

export class TestContext {
    private static requestInstance: request.SuperTest<request.Test>;
    private static databaseInstance: Database;

    // Unique instance of database
    public static database(): Database {
        if (!TestContext.databaseInstance) {
            TestContext.databaseInstance = databaseContextFactory();
        }

        return TestContext.databaseInstance;
    }

    // Unique instance of request
    public static request(): request.SuperTest<request.Test> {
        if (!TestContext.requestInstance) {
            TestContext.requestInstance = requestContextFactory();
        }

        return TestContext.requestInstance;
    }
}
