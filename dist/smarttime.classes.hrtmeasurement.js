"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
/**
 * easy high resolution time measurement
 */
class HrtMeasurement {
    constructor() {
        this.nanoSeconds = null;
        this.milliSeconds = null;
        this._hrTimeStart = null;
        this._hrTimeStopDiff = null;
        this._started = false;
    }
    /**
     * start the measurement
     */
    start() {
        this._started = true;
        this._hrTimeStart = process.hrtime();
    }
    /**
     * stop the measurement
     */
    stop() {
        if (this._started === false) {
            console.log("Hasn't started yet");
            return;
        }
        this._hrTimeStopDiff = process.hrtime(this._hrTimeStart);
        this.nanoSeconds = this._hrTimeStopDiff[0] * 1e9 + this._hrTimeStopDiff[1];
        this.milliSeconds = this.nanoSeconds / 1000000;
        return this;
    }
    /**
     * reset the measurement
     */
    reset() {
        this.nanoSeconds = null;
        this.milliSeconds = null;
        this._hrTimeStart = null;
        this._hrTimeStopDiff = null;
        this._started = false;
    }
}
exports.HrtMeasurement = HrtMeasurement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuaHJ0bWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy5ocnRtZWFzdXJlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUVuQzs7R0FFRztBQUNIO0lBQUE7UUFDRSxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBa0NwQyxDQUFDO0lBaENDOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBdkNELHdDQXVDQyJ9