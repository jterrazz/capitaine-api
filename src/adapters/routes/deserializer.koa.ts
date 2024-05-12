import { Context } from 'koa';

import { InputReaderKoa } from './read-input.koa.js';

export type KoaContext = Context;

export interface KoaDeserializer<T> {
    (getTypeSafeInputsFromRequest: InputReaderKoa): T;
}
