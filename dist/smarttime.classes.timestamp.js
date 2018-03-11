"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7OztHQUdHO0FBQ0g7SUF1Q0UsWUFBWSxVQUFtQjtRQUwvQjs7V0FFRztRQUNJLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFHM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUE5Q0Q7O09BRUc7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZUFBZTtRQUM1QyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBdUI7UUFDakQsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN2QyxjQUFjLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUNoRixNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFpQ0Q7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLFlBQXVCLEVBQUUsa0JBQTBCLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVNLDJCQUEyQixDQUFDLFlBQXVCLEVBQUUsa0JBQTBCLENBQUM7UUFDckYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVNLHlCQUF5QixDQUFDLGNBQXNCO1FBQ3JELE1BQU0sWUFBWSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7UUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUNqRSxNQUFNLGdCQUFnQixHQUFHLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRjtBQTNFRCw4QkEyRUMifQ==