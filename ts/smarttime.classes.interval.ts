import * as plugins from './smarttime.plugins';

export class Interval {
  public status: 'started' | 'stopped' | 'initial' = 'initial';
  private statusAuthorization: any = null;

  public intervalMilliseconds: number;
  public intervalJobs: Array<() => any> = [];
  constructor(intervalMillisencondsArg: number) {
    this.intervalMilliseconds = intervalMillisencondsArg;
  }

  public start() {
    this.status = 'started';
    const statusAuth = new Date();
    this.statusAuthorization = statusAuth;
    const runInterval = async () => {
      while (this.status === 'started' && this.statusAuthorization === statusAuth) {
        await plugins.smartdelay.delayFor(this.intervalMilliseconds);
        this.executeIntervalJobs();
      }
    };
    runInterval();
  }

  public stop() {
    this.status = 'stopped';
    this.statusAuthorization = null;
  }

  public addIntervalJob(funcArg: () => any) {
    this.intervalJobs.push(funcArg);
  }

  private executeIntervalJobs() {
    for (const funcArg of this.intervalJobs) {
      funcArg();
    }
  }
}
