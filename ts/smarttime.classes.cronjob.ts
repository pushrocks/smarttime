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
    this.croner = plugins.croner(this.cronExpression);
  }

  /**
   * checks wether the cronjob needs to be executed
   */
  public checkExecution(): number {
    if (this.nextExecutionUnix === 0) {
      this.nextExecutionUnix = this.croner.msToNext();
    }
    if (Date.now() > this.nextExecutionUnix) {
      this.jobFunction();
      this.nextExecutionUnix = this.croner.msToNext();
    }
    return this.nextExecutionUnix;
  }

  public start() {
    this.status = 'started';
  }

  public stop() {
    this.status = 'stopped';
  }
}
