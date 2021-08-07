import { IStore } from '@elux/core';
import { Location, RouteState } from './basic';
export declare class HistoryRecord {
    readonly key: string;
    readonly history: History;
    readonly store: IStore;
    pagename: string;
    query: string;
    sub: History;
    constructor(location: Location, key: string, history: History, store: IStore);
    getParams(): any;
}
export declare class History {
    private parent?;
    private records;
    constructor(parent?: History | undefined, record?: HistoryRecord);
    init(record: HistoryRecord): void;
    getLength(): number;
    getPages(): {
        pagename: string;
        key: string;
        page?: any;
    }[];
    findRecord(keyOrIndex: number | string): HistoryRecord | undefined;
    findIndex(key: string): number;
    getCurrentRecord(): HistoryRecord;
    getCurrentSubHistory(): History;
    push(location: Location, key: string, routeState: RouteState): void;
    replace(location: Location, key: string): void;
    relaunch(location: Location, key: string): void;
    preBack(delta: number, overflowRedirect?: boolean): HistoryRecord | undefined;
    back(delta: number, overflowRedirect?: boolean): void;
}
