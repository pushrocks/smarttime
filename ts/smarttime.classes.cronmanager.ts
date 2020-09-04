import * as plugins from './smarttime.plugins';
import { CronJob } from './smarttime.classes.cronjob';

export class CronManager {
  public executionTimeout: plugins.smartdelay.Timeout<void>;

  public status: 'started' | 'stopped' = 'stopped';
  public cronjobs = new plugins.lik.ObjectMap<CronJob>();

  constructor() {}

  public addCronjob(cronIdentifierArg: string, cronFunctionArg: () => Promise<void>) {
    const newCronJob = new CronJob(this, cronIdentifierArg, cronFunctionArg);
    this.cronjobs.add(newCronJob);
    if (this.status === 'started') {
      newCronJob.start();
    }

    return newCronJob;
  }

  public removeCronjob(cronjobArg: CronJob) {
    cronjobArg.stop();
    this.cronjobs.remove(cronjobArg);
  }

  /**
   * starts the cronjob
   */
  public start() {
    if (this.status !== 'started') {
      this.status = 'started';
      for (const cronJob of this.cronjobs.getArray()) {
        cronJob.start();
      }
      const runCronCycle = async () => {
        this.executionTimeout = new plugins.smartdelay.Timeout(0);
        do {
          let nextRunningCronjob: CronJob;
          for (const cronJob of this.cronjobs.getArray()) {
            cronJob.checkExecution();
            if (
              !nextRunningCronjob ||
              cronJob.getTimeToNextExecution() < nextRunningCronjob.getTimeToNextExecution()
            ) {
              nextRunningCronjob = cronJob;
            }
          }
          if (nextRunningCronjob) {
            this.executionTimeout = new plugins.smartdelay.Timeout(nextRunningCronjob.getTimeToNextExecution());
            console.log(
              `Next CronJob scheduled in ${this.executionTimeout.getTimeLeft()} milliseconds`
            );
          } else {
            this.executionTimeout = new plugins.smartdelay.Timeout(1000);
            console.log('no cronjobs specified! Checking again in 1 second');
          }
          
          
          await this.executionTimeout.promise;
        } while (this.status === 'started');
      };
      runCronCycle();
    }
  }

  /**
   * stops all cronjobs
   */
  public stop() {
    if (this.status === 'started') {
      this.status = 'stopped';
      this.executionTimeout.cancel();
    } else {
      console.log(`You tried to stop a CronManager that was not actually started.`);
    }
    for (const cron of this.cronjobs.getArray()) {
      cron.stop();
    }
  }
}
