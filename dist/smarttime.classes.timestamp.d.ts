/**
 * TimeStamp
 * smart timestamp
 */
export declare class TimeStamp {
    /**
     * The standard JavaScript Date
     */
    date: Date;
    /**
     * The time as linux time (milliseconds, not seconds though)
     * good for comparison
     */
    milliSeconds: number;
    /**
     * The standard epoch time in seconds
     */
    epochtime: number;
    /**
     * if derived from another TimeStamp points out the change in milliseconds
     */
    change: number;
    constructor(creatorArg?: number);
    /**
     * returns new TimeStamp from milliseconds
     */
    static fromMilliSeconds(milliSecondsArg: any): TimeStamp;
    /**
     * returns new TimeStamp for now with change set
     * @param timeStampArg
     */
    static fromTimeStamp(timeStampArg: TimeStamp): TimeStamp;
    /**
     * Is the current instance older than the argument
     * @param TimeStampArg
     */
    isOlderThan(TimeStampArg: TimeStamp, compareTimeArg?: number): boolean;
    isYoungerThan(TimeStampArg: TimeStamp, compareTimeArg?: number): boolean;
}
