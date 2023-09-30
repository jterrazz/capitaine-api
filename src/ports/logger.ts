export interface Logger {
    error(message: unknown): void;

    warn(message: unknown): void;

    info(message: unknown): void;

    debug(message: unknown): void;
}

export enum LoggerLevel {
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
}
