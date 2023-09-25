import { Context } from 'koa';

import { InputReaderKoa } from '@adapters/routes/read-input.koa';

export type KoaContext = Context;

export interface KoaDeserializer<T> {
    (getTypeSafeInputsFromRequest: InputReaderKoa): T;
}
