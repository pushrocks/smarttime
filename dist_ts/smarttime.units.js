"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMilliSecondsFromUnits = exports.units = void 0;
exports.units = {
    years: (timesArg = 1) => {
        return timesArg * 3.154e10;
    },
    months: (timesArg = 1) => {
        return timesArg * 2.628e9;
    },
    weeks: (timesArg = 1) => {
        return timesArg * 6.048e8;
    },
    days: (timesArg = 1) => {
        return timesArg * 8.64e7;
    },
    hours: (timesArg = 1) => {
        return timesArg * 3.6e6;
    },
    minutes: (timesArg = 1) => {
        return timesArg * 60000;
    }
};
exports.getMilliSecondsFromUnits = (combinationArg) => {
    let timeInMilliseconds = 0;
    let addMilliSeconds = milliSecondsArg => {
        timeInMilliseconds = timeInMilliseconds + milliSecondsArg;
    };
    if (combinationArg.years) {
        addMilliSeconds(exports.units.years(combinationArg.years));
    }
    if (combinationArg.months) {
        addMilliSeconds(exports.units.months(combinationArg.months));
    }
    if (combinationArg.weeks) {
        addMilliSeconds(exports.units.weeks(combinationArg.weeks));
    }
    if (combinationArg.days) {
        addMilliSeconds(exports.units.days(combinationArg.days));
    }
    if (combinationArg.hours) {
        addMilliSeconds(exports.units.hours(combinationArg.hours));
    }
    if (combinationArg.minutes) {
        addMilliSeconds(exports.units.minutes(combinationArg.minutes));
    }
    return timeInMilliseconds;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLnVuaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLnVuaXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFXLFFBQUEsS0FBSyxHQUFHO0lBQ2pCLEtBQUssRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBRTtRQUM5QixPQUFPLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNELE1BQU0sRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBRTtRQUMvQixPQUFPLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUN0QixPQUFPLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUNyQixPQUFPLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUN0QixPQUFPLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUN4QixPQUFPLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUM7QUFXUyxRQUFBLHdCQUF3QixHQUFHLENBQUMsY0FBbUMsRUFBRSxFQUFFO0lBQzVFLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLElBQUksZUFBZSxHQUFHLGVBQWUsQ0FBQyxFQUFFO1FBQ3RDLGtCQUFrQixHQUFHLGtCQUFrQixHQUFHLGVBQWUsQ0FBQztJQUM1RCxDQUFDLENBQUM7SUFDRixJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUU7UUFDeEIsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDekIsZUFBZSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUU7UUFDeEIsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFDRCxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7UUFDdkIsZUFBZSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUU7UUFDeEIsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFDRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7UUFDMUIsZUFBZSxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQyJ9