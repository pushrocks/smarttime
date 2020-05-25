/**
 * easy high resolution time measurement
 */
export class HrtMeasurement {
  public nanoSeconds: number = null;
  public milliSeconds: number = null;
  private _hrTimeStart = null;
  private _hrTimeStopDiff = null;
  private _started: boolean = false;

  /**
   * start the measurement
   */
  public start() {
    this._started = true;
    this._hrTimeStart = process.hrtime();
  }

  /**
   * stop the measurement
   */
  public stop() {
    if (this._started === false) {
      console.log("Hasn't started yet");
      return;
    }
    this._hrTimeStopDiff = process.hrtime(this._hrTimeStart);
    this.nanoSeconds = this._hrTimeStopDiff[0] * 1e9 + this._hrTimeStopDiff[1];
    this.milliSeconds = this.nanoSeconds / 1000000;
    return this;
  }

  /**
   * reset the measurement
   */
  public reset() {
    this.nanoSeconds = null;
    this.milliSeconds = null;
    this._hrTimeStart = null;
    this._hrTimeStopDiff = null;
    this._started = false;
  }
}
