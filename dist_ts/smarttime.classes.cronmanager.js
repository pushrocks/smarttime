"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronManager = void 0;
const smarttime_classes_cronjob_1 = require("./smarttime.classes.cronjob");
const smarttime_classes_interval_1 = require("./smarttime.classes.interval");
class CronManager {
    constructor() {
        this.cronInterval = new smarttime_classes_interval_1.Interval(1000);
        this.status = 'stopped';
        this.cronjobs = [];
        this.cronInterval.addIntervalJob(() => {
            for (const cronJob of this.cronjobs) {
                cronJob.checkExecution();
            }
        });
    }
    addCronjob(cronIdentifierArg, cronFunctionArg) {
        const newCronJob = new smarttime_classes_cronjob_1.CronJob(this, cronIdentifierArg, cronFunctionArg);
        this.cronjobs.push(newCronJob);
        if (this.status === 'started') {
            newCronJob.start();
        }
    }
    /**
     * starts the cronjob
     */
    start() {
        this.status = 'started';
        for (const cron of this.cronjobs) {
            cron.start();
        }
        this.cronInterval.start();
    }
    /**
     * stops all cronjobs
     */
    stop() {
        this.status = 'stopped';
        for (const cron of this.cronjobs) {
            cron.stop();
        }
        this.cronInterval.stop();
    }
}
exports.CronManager = CronManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuY3Jvbm1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy5jcm9ubWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyRUFBc0Q7QUFFdEQsNkVBQXdEO0FBRXhELE1BQWEsV0FBVztJQU10QjtRQUxPLGlCQUFZLEdBQUcsSUFBSSxxQ0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLFdBQU0sR0FBMEIsU0FBUyxDQUFDO1FBQzFDLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO1lBQ3BDLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sVUFBVSxDQUFDLGlCQUF5QixFQUFFLGVBQTBCO1FBQ3JFLE1BQU0sVUFBVSxHQUFHLElBQUksbUNBQU8sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUEzQ0Qsa0NBMkNDIn0=