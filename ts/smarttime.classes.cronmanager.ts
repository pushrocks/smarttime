import * as plugins from './smarttime.plugins';
import { CronJob } from './smarttime.classes.cronjob';
import { Timer } from './smarttime.classes.timer';
import { Interval } from './smarttime.classes.interval';

export class CronManager {
  public cronInterval = new Interval(1000);

  public status: 'started' | 'stopped' = 'stopped';
  public cronjobs: CronJob[] = [];

  constructor() {
    this.cronInterval.addIntervalJob(() => {
      for (const cronJob of this.cronjobs) {
        cronJob.checkExecution();
      }
    });
  }

  public addCronjob(cronIdentifierArg: string, cronFunctionArg: () => any) {
    const newCronJob = new CronJob(this, cronIdentifierArg, cronFunctionArg);
    this.cronjobs.push(newCronJob);
    if (this.status === 'started') {
      newCronJob.start();
    }
  }

  /**
   * starts the cronjob
   */
  public start() {
    this.status = 'started';
    for (const cron of this.cronjobs) {
      cron.start();
    }
    this.cronInterval.start();
  }

  /**
   * stops all cronjobs
   */
  public stop() {
    this.status = 'stopped';
    for (const cron of this.cronjobs) {
      cron.stop();
    }
    this.cronInterval.stop();
  }
}
