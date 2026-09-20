import { defineSpecConfig, unit, website } from '@jterrazz/test/vitest';

export default defineSpecConfig({
    test: {
        projects: [
            unit({ include: ['src/**/*.test.ts'] }),
            website({
                include: ['specs/website/**/*.spec.ts'],
                serial: true,
                timeout: 60_000,
            }),
        ],
    },
});
