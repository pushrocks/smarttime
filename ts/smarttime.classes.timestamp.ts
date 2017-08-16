import * as plugins from './smarttime.plugins'

/**
 * TimeStamp
 * smart timestamp
 */
export class TimeStamp {
  /**
   * The standard JavaScript Date
   */
  date: Date

  /**
   * The time as linux time (milliseconds, not seconds though)
   * good for comparison
   */
  milliSeconds: number

  /**
   * The standard epoch time in seconds
   */
  epochtime: number

  /**
   * if derived from another TimeStamp points out the change in milliseconds
   */
  change: number = null

  constructor (creatorArg?: number) {
    if (!creatorArg) {
      this.date = new Date()
    } else if (typeof creatorArg === 'number') {
      this.date = new Date(creatorArg)
    }
    this.milliSeconds = this.date.getTime()
    this.epochtime = Math.floor(this.milliSeconds / 1000)
  }

  /**
   * returns new TimeStamp from milliseconds
   */
  static fromMilliSeconds (milliSecondsArg) {
    return new TimeStamp(milliSecondsArg)
  }

  /**
   * returns new TimeStamp for now with change set
   * @param timeStampArg
   */
  static fromTimeStamp (timeStampArg: TimeStamp) {
    let localTimeStamp = new TimeStamp()
    localTimeStamp.change = localTimeStamp.milliSeconds - timeStampArg.milliSeconds
    return localTimeStamp
  }

  /**
   * Is the current instance older than the argument
   * @param TimeStampArg
   */
  isOlderThan (TimeStampArg: TimeStamp) {
    if (this.milliSeconds < TimeStampArg.milliSeconds) {
      return true
    } else {
      return false
    }
  }

  isYoungerThan (TimeStampArg: TimeStamp) {
    if (this.milliSeconds > TimeStampArg.milliSeconds) {
      return true
    } else {
      return false
    }
  }
}
