import * as plugins from './smarttime.plugins';
import { CronJob } from './smarttime.classes.cronjob';

export class CronManager {
  public executionTimeout: plugins.smartdelay.Timeout<void>;

  public status: 'started' | 'stopped' = 'stopped';
  public cronjobs: CronJob[] = [];

  constructor() {}

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
    for (const cronJob of this.cronjobs) {
      cronJob.start();
    }
    this.executionTimeout = new plugins.smartdelay.Timeout(0);

    // recursion
    const runCheckExecution = () => {
      console.log(`Next CronJob scheduled in ${this.executionTimeout.getTimeLeft()} milliseconds`);
      this.executionTimeout.promise.then(() => {
        let timeToNextOverallExecution: number;
        for (const cronJob of this.cronjobs) {
          const timeToNextJobExecution = cronJob.checkExecution();
          if (timeToNextJobExecution < timeToNextOverallExecution || !timeToNextOverallExecution) {
            timeToNextOverallExecution = timeToNextJobExecution;
          }
        }
        this.executionTimeout = new plugins.smartdelay.Timeout(timeToNextOverallExecution);
        runCheckExecution();
      });
    };

    runCheckExecution();
  }

  /**
   * stops all cronjobs
   */
  public stop() {
    this.status = 'stopped';
    this.executionTimeout.cancel();
    for (const cron of this.cronjobs) {
      cron.stop();
    }
  }
}
