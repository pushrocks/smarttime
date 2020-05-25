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
exports.Interval = void 0;
const plugins = __importStar(require("./smarttime.plugins"));
class Interval {
    constructor(intervalMillisencondsArg) {
        this.status = 'initial';
        this.statusAuthorization = null;
        this.intervalJobs = [];
        this.intervalMilliseconds = intervalMillisencondsArg;
    }
    start() {
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
    stop() {
        this.status = 'stopped';
        this.statusAuthorization = null;
    }
    addIntervalJob(funcArg) {
        this.intervalJobs.push(funcArg);
    }
    executeIntervalJobs() {
        for (const funcArg of this.intervalJobs) {
            funcArg();
        }
    }
}
exports.Interval = Interval;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuaW50ZXJ2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHRpbWUuY2xhc3Nlcy5pbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQStDO0FBRS9DLE1BQWEsUUFBUTtJQU1uQixZQUFZLHdCQUFnQztRQUxyQyxXQUFNLEdBQXNDLFNBQVMsQ0FBQztRQUNyRCx3QkFBbUIsR0FBUSxJQUFJLENBQUM7UUFHakMsaUJBQVksR0FBcUIsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyx3QkFBd0IsQ0FBQztJQUN2RCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztRQUN0QyxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxVQUFVLEVBQUU7Z0JBQzNFLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsV0FBVyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVNLElBQUk7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxjQUFjLENBQUMsT0FBa0I7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdkMsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQXJDRCw0QkFxQ0MifQ==