import { CronManager } from './smarttime.classes.cronmanager';
export declare type TJobFunction = (() => void) | (() => Promise<any>);
export declare class CronJob {
    status: 'started' | 'stopped' | 'initial';
    cronExpression: string;
    jobFunction: TJobFunction;
    private cronInterval;
    private nextExecutionUnix;
    constructor(cronManager: CronManager, cronExpressionArg: string, jobFunction: TJobFunction);
    /**
     * checks wether the cronjob needs to be executed
     */
    checkExecution(): void;
    start(): void;
    stop(): void;
    private getCronInterval;
}
