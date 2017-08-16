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
   * The time as linux time
   * good for comparison
   */
  linuxtime: number
  constructor (creatorArg?: number | TimeStamp) {
    if (!creatorArg) {
      this.date = new Date()
      this.linuxtime = this.date.getTime()
    }
  }

  /**
   * Is the current instance older than the argument
   * @param TimeStampArg
   */
  isOlderThan (TimeStampArg: TimeStamp) {
    if (this.linuxtime < TimeStampArg.linuxtime) {
      return true
    } else {
      return false
    }
  }

  isYoungerThan (TimeStampArg: TimeStamp) {
    if (this.linuxtime > TimeStampArg.linuxtime) {
      return true
    } else {
      return false
    }
  }
}
