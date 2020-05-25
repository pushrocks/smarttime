import { CronJob } from './smarttime.classes.cronjob';
import { Interval } from './smarttime.classes.interval';
export declare class CronManager {
    cronInterval: Interval;
    status: 'started' | 'stopped';
    cronjobs: CronJob[];
    constructor();
    addCronjob(cronIdentifierArg: string, cronFunctionArg: () => any): void;
    /**
     * starts the cronjob
     */
    start(): void;
    /**
     * stops all cronjobs
     */
    stop(): void;
}
