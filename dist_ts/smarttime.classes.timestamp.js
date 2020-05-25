"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStamp = void 0;
/**
 * TimeStamp
 * smart timestamp
 */
class TimeStamp {
    constructor(creatorArg) {
        /**
         * if derived from another TimeStamp points out the change in milliseconds
         */
        this.change = null;
        if (!creatorArg) {
            this.date = new Date();
        }
        else if (typeof creatorArg === 'number') {
            this.date = new Date(creatorArg);
        }
        this.milliSeconds = this.date.getTime();
        this.epochtime = Math.floor(this.milliSeconds / 1000);
    }
    /**
     * returns new TimeStamp from milliseconds
     */
    static fromMilliSeconds(milliSecondsArg) {
        return new TimeStamp(milliSecondsArg);
    }
    /**
     * returns new TimeStamp for now with change set
     * @param timeStampArg
     */
    static fromTimeStamp(timeStampArg) {
        const localTimeStamp = new TimeStamp();
        localTimeStamp.change = localTimeStamp.milliSeconds - timeStampArg.milliSeconds;
        return localTimeStamp;
    }
    /**
     * Is the current instance older than the argument
     * @param TimeStampArg
     */
    isOlderThan(TimeStampArg, tresholdTimeArg = 0) {
        if (this.milliSeconds + tresholdTimeArg < TimeStampArg.milliSeconds) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * returns a boolean for wether a timestamp is younger
     * @param TimeStampArg
     * @param tresholdTimeArg
     */
    isYoungerThanOtherTimeStamp(TimeStampArg, tresholdTimeArg = 0) {
        if (this.milliSeconds > TimeStampArg.milliSeconds + tresholdTimeArg) {
            return true;
        }
        else {
            return false;
        }
    }
    isYoungerThanMilliSeconds(millisecondArg) {
        const nowTimeStamp = new TimeStamp();
        const compareEpochTime = nowTimeStamp.epochtime - millisecondArg;
        const compareTimeStamp = new TimeStamp(compareEpochTime);
        return this.isYoungerThanOtherTimeStamp(compareTimeStamp);
    }
}
exports.TimeStamp = TimeStamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7R0FHRztBQUNILE1BQWEsU0FBUztJQXVDcEIsWUFBWSxVQUFtQjtRQUwvQjs7V0FFRztRQUNJLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFHM0IsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN4QjthQUFNLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQTlDRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlO1FBQzVDLE9BQU8sSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBdUI7UUFDakQsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN2QyxjQUFjLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUNoRixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBaUNEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxZQUF1QixFQUFFLGtCQUEwQixDQUFDO1FBQ3JFLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUNuRSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwyQkFBMkIsQ0FBQyxZQUF1QixFQUFFLGtCQUEwQixDQUFDO1FBQ3JGLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxHQUFHLGVBQWUsRUFBRTtZQUNuRSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVNLHlCQUF5QixDQUFDLGNBQXNCO1FBQ3JELE1BQU0sWUFBWSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDckMsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUNqRSxNQUFNLGdCQUFnQixHQUFHLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUFoRkQsOEJBZ0ZDIn0=