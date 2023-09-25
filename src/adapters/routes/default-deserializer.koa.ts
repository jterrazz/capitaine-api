import { KoaDeserializer } from '@adapters/routes/deserializer.koa';

export const defaultDeserializerKoa: KoaDeserializer<undefined> = () => {
    return undefined;
};
