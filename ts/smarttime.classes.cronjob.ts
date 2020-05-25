import * as plugins from './smarttime.plugins';
import { CronManager } from './smarttime.classes.cronmanager';

export type TJobFunction = (() => void) | (() => Promise<any>);

export class CronJob {
  public status: 'started' | 'stopped' | 'initial' = 'initial';
  public cronExpression: string;
  public jobFunction: TJobFunction;

  private cronInterval = plugins.cronParser.parseExpression('* * * * * *');
  private nextExecutionUnix: number = 0;

  constructor(cronManager: CronManager, cronExpressionArg: string, jobFunction: TJobFunction) {
    this.cronExpression = cronExpressionArg;
    this.jobFunction = jobFunction;
  }

  /**
   * checks wether the cronjob needs to be executed
   */
  public checkExecution() {
    if (this.nextExecutionUnix === 0) {
      this.nextExecutionUnix = this.cronInterval
        .next()
        .toDate()
        .getTime();
      return;
    }
    if (Date.now() > this.nextExecutionUnix) {
      this.jobFunction();
      this.nextExecutionUnix = this.cronInterval
        .next()
        .toDate()
        .getTime();
    }
  }

  public start() {
    this.cronInterval = this.getCronInterval();
    this.status = 'started';
  }

  public stop() {
    this.status = 'stopped';
  }

  private getCronInterval() {
    return plugins.cronParser.parseExpression(this.cronExpression);
  }
}
