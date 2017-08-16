/**
 * easy high resolution time measurement
 */
export declare class HrtMeasurement {
    nanoSeconds: number;
    milliSeconds: number;
    private _hrTimeStart;
    private _hrTimeStopDiff;
    private _started;
    /**
     * start the measurement
     */
    start(): void;
    /**
     * stop the measurement
     */
    stop(): this;
    /**
     * reset the measurement
     */
    reset(): void;
}
