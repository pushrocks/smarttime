import * as plugins from './smarttime.plugins';

import { TimeStamp } from './smarttime.classes.timestamp';

export type TimerState = 'initiated' | 'started' | 'paused' | 'completed';

export class Timer {
  /**
   * the original amount of milliseconds for this Timer
   */
  public timeInMilliseconds: number;

  /**
   * the state of the timer
   */
  public state: TimerState = 'initiated';

  /**
   * completed Promise
   */
  public completed: Promise<void>;

  /**
   * a reference to when the Timeout started
   */
  public startedAt: TimeStamp;

  /**
   * a reference to when a Timer has been potentially paused
   */
  public pausedAt: TimeStamp;

  get timeLeft(): number {
    return this.timeInMilliseconds - this.pausedAt.change;
  }
  /**
   * the current timeout the needs to be canceled when this Timer is stopped
   */
  private currentTimeout: NodeJS.Timer;

  // a deferred triggeted when Timer has completed
  private completedDeferred = plugins.smartq.defer<void>();

  constructor(timeInMillisecondsArg: number) {
    this.timeInMilliseconds = timeInMillisecondsArg;
    this.completed = this.completedDeferred.promise;
  }

  /**
   * starts the timer
   */
  public start() {
    if (!this.startedAt) {
      this.currentTimeout = setTimeout(() => {
        this.completedDeferred.resolve();
      }, this.timeInMilliseconds);
      this.startedAt = new TimeStamp();
    } else {
      throw new Error('timer has been started before. Please use resume instead');
    }
  }

  public pause() {
    clearTimeout(this.currentTimeout);
    this.pausedAt = TimeStamp.fromTimeStamp(this.startedAt);
  }

  public resume() {
    if (this.startedAt) {
      this.currentTimeout = setTimeout(() => {
        this.completedDeferred.resolve();
      }, this.timeLeft);
    }
  }
}
