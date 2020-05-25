"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrtMeasurement = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuaHJ0bWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy5ocnRtZWFzdXJlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQWEsY0FBYztJQUEzQjtRQUNTLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFrQ3BDLENBQUM7SUFoQ0M7O09BRUc7SUFDSSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBdkNELHdDQXVDQyJ9