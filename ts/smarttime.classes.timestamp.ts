import * as plugins from './smarttime.plugins';

/**
 * TimeStamp
 * smart timestamp
 */
export class TimeStamp {
  /**
   * returns new TimeStamp from milliseconds
   */
  public static fromMilliSeconds(milliSecondsArg) {
    return new TimeStamp(milliSecondsArg);
  }

  /**
   * returns new TimeStamp for now with change set
   * @param timeStampArg
   */
  public static fromTimeStamp(timeStampArg: TimeStamp) {
    const localTimeStamp = new TimeStamp();
    localTimeStamp.change = localTimeStamp.milliSeconds - timeStampArg.milliSeconds;
    return localTimeStamp;
  }

  /**
   * The standard JavaScript Date
   */
  public date: Date;

  /**
   * The time as linux time (milliseconds, not seconds though)
   * good for comparison
   */
  public milliSeconds: number;

  /**
   * The standard epoch time in seconds
   */
  public epochtime: number;

  /**
   * if derived from another TimeStamp points out the change in milliseconds
   */
  public change: number = null;

  constructor(creatorArg?: number) {
    if (!creatorArg) {
      this.date = new Date();
    } else if (typeof creatorArg === 'number') {
      this.date = new Date(creatorArg);
    }
    this.milliSeconds = this.date.getTime();
    this.epochtime = Math.floor(this.milliSeconds / 1000);
  }

  /**
   * Is the current instance older than the argument
   * @param TimeStampArg
   */
  public isOlderThan(TimeStampArg: TimeStamp, tresholdTimeArg: number = 0) {
    if (this.milliSeconds + tresholdTimeArg < TimeStampArg.milliSeconds) {
      return true;
    } else {
      return false;
    }
  }

  public isYoungerThan(TimeStampArg: TimeStamp, tresholdTimeArg: number = 0) {
    if (this.milliSeconds > TimeStampArg.milliSeconds + tresholdTimeArg) {
      return true;
    } else {
      return false;
    }
  }
}
