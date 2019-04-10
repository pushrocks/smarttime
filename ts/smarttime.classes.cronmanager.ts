import * as plugins from './smarttime.plugins';

export class CronManager {
  public status: 'started' | 'stopped' = 'stopped';

  public cronjobs: plugins.cron.CronJob[] = [];

  public addCronjob(cronIdentifierArg: string, cronFunctionArg: plugins.cron.CronCommand) {
    const newCronJob = new plugins.cron.CronJob(cronIdentifierArg,cronFunctionArg);
    if (this.status === 'started') {
      newCronJob.start();
    }
    this.cronjobs.push(newCronJob);
  };

  /**
   * starts the cronjob
   */
  public start() {
    this.status = 'started';
    for (const cron of this.cronjobs) {
      cron.start();
    }
  }

  /**
   * stops all cronjobs
   */
  public stop() {
    this.status = 'stopped';
    for (const cron of this.cronjobs) {
      cron.stop();
    }
  }
}
