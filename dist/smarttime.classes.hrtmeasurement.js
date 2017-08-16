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
            console.log('Hasn\'t started yet');
            return;
        }
        this._hrTimeStopDiff = process.hrtime(this._hrTimeStart);
        this.nanoSeconds = (this._hrTimeStopDiff[0] * 1e9) + this._hrTimeStopDiff[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuaHJ0bWVhc3VyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy5ocnRtZWFzdXJlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUVsQzs7R0FFRztBQUNIO0lBQUE7UUFDRSxnQkFBVyxHQUFXLElBQUksQ0FBQTtRQUMxQixpQkFBWSxHQUFXLElBQUksQ0FBQTtRQUNuQixpQkFBWSxHQUFHLElBQUksQ0FBQTtRQUNuQixvQkFBZSxHQUFHLElBQUksQ0FBQTtRQUN0QixhQUFRLEdBQVksS0FBSyxDQUFBO0lBa0NuQyxDQUFDO0lBaENDOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ2xDLE1BQU0sQ0FBQTtRQUNSLENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQTtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7Q0FDRjtBQXZDRCx3Q0F1Q0MifQ==