import { TimeStamp } from './smarttime.classes.timestamp';
export declare type TimerState = 'initiated' | 'started' | 'paused' | 'completed';
export declare class Timer {
    /**
     * the original amount of milliseconds for this Timer
     */
    timeInMilliseconds: number;
    /**
     * the state of the timer
     */
    state: TimerState;
    /**
     * completed Promise
     */
    completed: Promise<void>;
    /**
     * a reference to when the Timeout started
     */
    startedAt: TimeStamp;
    /**
     * a reference to when a Timer has been potentially paused
     */
    pausedAt: TimeStamp;
    readonly timeLeft: number;
    /**
     * the current timeout the needs to be canceled when this Timer is stopped
     */
    private currentTimeout;
    private completedDeferred;
    constructor(timeInMillisecondsArg: number);
    /**
     * starts the timer
     */
    start(): void;
    pause(): void;
    resume(): void;
}
