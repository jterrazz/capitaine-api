import * as z from 'zod';

import { KoaDeserializer } from '../deserializer.koa.js';
import { InputReaderKoa } from '../read-input.koa.js';

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
