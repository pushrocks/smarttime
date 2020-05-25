export declare class Interval {
    status: 'started' | 'stopped' | 'initial';
    private statusAuthorization;
    intervalMilliseconds: number;
    intervalJobs: Array<() => any>;
    constructor(intervalMillisencondsArg: number);
    start(): void;
    stop(): void;
    addIntervalJob(funcArg: () => any): void;
    private executeIntervalJobs;
}
