"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const plugins = __importStar(require("./smarttime.plugins"));
const smarttime_classes_timestamp_1 = require("./smarttime.classes.timestamp");
class Timer {
    constructor(timeInMillisecondsArg) {
        /**
         * the state of the timer
         */
        this.state = 'initiated';
        // a deferred triggeted when Timer has completed
        this.completedDeferred = plugins.smartpromise.defer();
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
        if (this.startedAt) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
            this.pausedAt = smarttime_classes_timestamp_1.TimeStamp.fromTimeStamp(this.startedAt);
        }
    }
    resume() {
        if (this.startedAt) {
            this.currentTimeout = setTimeout(() => {
                this.completedDeferred.resolve();
            }, this.timeLeft);
        }
        else {
            throw new Error('timer has NOT been started before. Please use .start() instead');
        }
    }
    reset() {
        this.pause();
        this.startedAt = null;
        this.pausedAt = null;
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMudGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy50aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQStDO0FBRS9DLCtFQUEwRDtBQUkxRCxNQUFhLEtBQUs7SUFxQ2hCLFlBQVkscUJBQTZCO1FBL0J6Qzs7V0FFRztRQUNJLFVBQUssR0FBZSxXQUFXLENBQUM7UUF5QnZDLGdEQUFnRDtRQUN4QyxzQkFBaUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBUSxDQUFDO1FBRzdELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDbEQsQ0FBQztJQWRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFjRDs7T0FFRztJQUNJLEtBQUs7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVDQUFTLEVBQUUsQ0FBQztTQUNsQzthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLHVDQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBL0VELHNCQStFQyJ9