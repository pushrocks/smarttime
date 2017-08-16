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
        let localTimeStamp = new TimeStamp();
        localTimeStamp.change = localTimeStamp.milliSeconds - timeStampArg.milliSeconds;
        return localTimeStamp;
    }
    /**
     * Is the current instance older than the argument
     * @param TimeStampArg
     */
    isOlderThan(TimeStampArg, compareTimeArg) {
        if (this.milliSeconds < TimeStampArg.milliSeconds &&
            (!compareTimeArg ||
                (compareTimeArg && ((TimeStampArg.milliSeconds - this.milliSeconds) > compareTimeArg)))) {
            return true;
        }
        else {
            return false;
        }
    }
    isYoungerThan(TimeStampArg, compareTimeArg) {
        if (this.milliSeconds > TimeStampArg.milliSeconds &&
            (!compareTimeArg ||
                (compareTimeArg && ((this.milliSeconds - TimeStampArg.milliSeconds) > compareTimeArg)))) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.TimeStamp = TimeStamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLmNsYXNzZXMudGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7OztHQUdHO0FBQ0g7SUFzQkUsWUFBYSxVQUFtQjtRQUxoQzs7V0FFRztRQUNILFdBQU0sR0FBVyxJQUFJLENBQUE7UUFHbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxlQUFlO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBRSxZQUF1QjtRQUMzQyxJQUFJLGNBQWMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO1FBQ3BDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFBO1FBQy9FLE1BQU0sQ0FBQyxjQUFjLENBQUE7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVcsQ0FBRSxZQUF1QixFQUFFLGNBQXVCO1FBQzNELEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVk7WUFDN0MsQ0FDRSxDQUFDLGNBQWM7Z0JBQ2YsQ0FDRSxjQUFjLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUNyRixDQUVMLENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBRSxZQUF1QixFQUFFLGNBQXVCO1FBQzdELEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVk7WUFDN0MsQ0FDRSxDQUFDLGNBQWM7Z0JBQ2YsQ0FDRSxjQUFjLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUNyRixDQUVMLENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBcEZELDhCQW9GQyJ9