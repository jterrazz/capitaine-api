import * as z from 'zod';

import { KoaDeserializer } from '@adapters/routes/deserializer.koa';
import { InputReaderKoa } from '@adapters/routes/read-input.koa';

const schema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/).transform(Number),
    }),
});

export const getUserDeserializerKoa: KoaDeserializer<number> = (readInput: InputReaderKoa) => {
    const {
        params: { id },
    } = readInput(schema);

    return id;
};
