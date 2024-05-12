import { KoaDeserializer } from './deserializer.koa.js';

export const defaultDeserializerKoa: KoaDeserializer<undefined> = () => {
    return undefined;
};
