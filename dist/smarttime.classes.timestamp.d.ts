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
     * The time as linux time
     * good for comparison
     */
    linuxtime: number;
    constructor(creatorArg?: number | TimeStamp);
    /**
     * Is the current instance older than the argument
     * @param TimeStampArg
     */
    isOlderThan(TimeStampArg: TimeStamp): boolean;
    isYoungerThan(TimeStampArg: TimeStamp): boolean;
}
