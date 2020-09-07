import * as plugins from './smarttime.plugins';
import { CronManager } from './smarttime.classes.cronmanager';

export type TJobFunction = (() => void) | (() => Promise<any>);

export class CronJob {
  public croner;
  public status: 'started' | 'stopped' | 'initial' = 'initial';
  public cronExpression: string;
  public jobFunction: TJobFunction;
  private nextExecutionUnix: number = 0;

  constructor(cronManager: CronManager, cronExpressionArg: string, jobFunction: TJobFunction) {
    this.cronExpression = cronExpressionArg;
    this.jobFunction = jobFunction;
    // this.croner = plugins.croner(this.cronExpression);
  }

  /**
   * checks wether the cronjob needs to be executed
   */
  public checkExecution(): number {
    if (this.nextExecutionUnix === 0) {
      this.getNextExecutionTime();
    }
    if (Date.now() > this.nextExecutionUnix) {
      const maybePromise = this.jobFunction();
      if (maybePromise instanceof Promise) {
        maybePromise.catch(e => console.log(e));
      }
      this.nextExecutionUnix = this.getNextExecutionTime();
    }
    return this.nextExecutionUnix;
  }

  public getNextExecutionTime() {
    return this.nextExecutionUnix = Date.now() + this.getTimeToNextExecution();
  }

  /**
   * gets the time to next execution
   */
  public getTimeToNextExecution() {
    return 600000;
  }

  public start() {
    this.status = 'started';
  }

  public stop() {
    this.status = 'stopped';
  }
}
