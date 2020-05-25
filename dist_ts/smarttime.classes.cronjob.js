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
exports.CronJob = void 0;
const plugins = __importStar(require("./smarttime.plugins"));
class CronJob {
    constructor(cronManager, cronExpressionArg, jobFunction) {
        this.status = 'initial';
        this.cronInterval = plugins.cronParser.parseExpression('* * * * * *');
        this.nextExecutionUnix = 0;
        this.cronExpression = cronExpressionArg;
        this.jobFunction = jobFunction;
    }
    /**
     * checks wether the cronjob needs to be executed
     */
    checkExecution() {
        if (this.nextExecutionUnix === 0) {
            this.nextExecutionUnix = this.cronInterval.next().toDate().getTime();
            return;
        }
        if (Date.now() > this.nextExecutionUnix) {
            this.jobFunction();
            this.nextExecutionUnix = this.cronInterval.next().toDate().getTime();
        }
    }
    start() {
        this.cronInterval = this.getCronInterval();
        this.status = 'started';
    }
    stop() {
        this.status = 'stopped';
    }
    getCronInterval() {
        return plugins.cronParser.parseExpression(this.cronExpression);
    }
}
exports.CronJob = CronJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuY3JvbmpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dGltZS5jbGFzc2VzLmNyb25qb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUErQztBQUsvQyxNQUFhLE9BQU87SUFRbEIsWUFBWSxXQUF3QixFQUFFLGlCQUF5QixFQUFFLFdBQXlCO1FBUG5GLFdBQU0sR0FBc0MsU0FBUyxDQUFDO1FBSXJELGlCQUFZLEdBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksY0FBYztRQUNuQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckUsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVNLElBQUk7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU8sZUFBZTtRQUNyQixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0Y7QUF2Q0QsMEJBdUNDIn0=