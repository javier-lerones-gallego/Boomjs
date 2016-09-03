
// TODO: replace anys
export interface ILogService {
    timestamp: string;

    debug(message: string, more: Array<any>): void;
    error(message: string, more: Array<any>): void;
    info(message: string, more: Array<any>): void;
}
