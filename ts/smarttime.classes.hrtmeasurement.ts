/**
 * easy high resolution time measurement
 */
export class HrtMeasurement {
  public nanoSeconds: number = null;
  public milliSeconds: number = null;
  private _milliStart: number = null;
  private _milliDiff: number = null;
  private _started: boolean = false;

  /**
   * start the measurement
   */
  public start() {
    this._started = true;
    this._milliStart = Date.now();
  }

  /**
   * stop the measurement
   */
  public stop() {
    if (this._started === false) {
      console.log("Hasn't started yet");
      return;
    }
    this._milliDiff = Date.now() - this._milliStart;
    this.nanoSeconds = this._milliDiff * 1000;
    this.milliSeconds = this._milliDiff;
    return this;
  }

  /**
   * reset the measurement
   */
  public reset() {
    this.nanoSeconds = null;
    this.milliSeconds = null;
    this._milliStart = null;
    this._milliDiff = null;
    this._started = false;
  }
}
