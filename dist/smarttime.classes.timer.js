"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smarttime.plugins");
const smarttime_classes_timestamp_1 = require("./smarttime.classes.timestamp");
class Timer {
    constructor(timeInMillisecondsArg) {
        /**
         * the state of the timer
         */
        this.state = 'initiated';
        // a deferred triggeted when Timer has completed
        this.completedDeferred = plugins.smartq.defer();
        this.timeInMilliseconds = timeInMillisecondsArg;
        this.completed = this.completedDeferred.promise;
    }
    get timeLeft() {
        return this.timeInMilliseconds - this.pausedAt.change;
    }
    /**
     * starts the timer
     */
    start() {
        if (!this.startedAt) {
            this.currentTimeout = setTimeout(() => {
                this.completedDeferred.resolve();
            }, this.timeInMilliseconds);
            this.startedAt = new smarttime_classes_timestamp_1.TimeStamp();
        }
        else {
            throw new Error('timer has been started before. Please use resume instead');
        }
    }
    pause() {
        clearTimeout(this.currentTimeout);
        this.pausedAt = smarttime_classes_timestamp_1.TimeStamp.fromTimeStamp(this.startedAt);
    }
    resume() {
        if (this.startedAt) {
            this.currentTimeout = setTimeout(() => {
                this.completedDeferred.resolve();
            }, this.timeLeft);
        }
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMudGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy50aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUErQztBQUUvQywrRUFBMEQ7QUFJMUQ7SUFxQ0UsWUFBWSxxQkFBNkI7UUEvQnpDOztXQUVHO1FBQ0ksVUFBSyxHQUFlLFdBQVcsQ0FBQztRQXlCdkMsZ0RBQWdEO1FBQ3hDLHNCQUFpQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFRLENBQUM7UUFHdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUNsRCxDQUFDO0lBZEQsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN4RCxDQUFDO0lBY0Q7O09BRUc7SUFDSSxLQUFLO1FBQ1YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVDQUFTLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVDQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sTUFBTTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXBFRCxzQkFvRUMifQ==