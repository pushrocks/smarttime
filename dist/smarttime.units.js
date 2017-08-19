"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.units = {
    years: (timesArg = 1) => {
        return timesArg * 3.154e+10;
    },
    months: (timesArg = 1) => {
        return timesArg * 2.628e+9;
    },
    weeks: (timesArg = 1) => {
        return timesArg * 6.048e+8;
    },
    days: (timesArg = 1) => {
        return timesArg * 8.64e+7;
    },
    hours: (timesArg = 1) => {
        return timesArg * 3.6e+5;
    },
    minutes: (timesArg = 1) => {
        return timesArg * 60000;
    }
};
exports.getMilliSecondsFromUnits = (combinationArg) => {
    let timeInMilliseconds = 0;
    let addMilliSeconds = (milliSecondsArg) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLnVuaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLnVuaXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQVcsUUFBQSxLQUFLLEdBQUc7SUFDakIsS0FBSyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUM7UUFDbEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUE7SUFDN0IsQ0FBQztJQUNELE1BQU0sRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzVCLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQztRQUNsQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUM7UUFDakIsTUFBTSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUE7SUFDM0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO0lBQzFCLENBQUM7SUFDRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQztRQUNwQixNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtJQUN6QixDQUFDO0NBQ0YsQ0FBQTtBQVdVLFFBQUEsd0JBQXdCLEdBQUcsQ0FBQyxjQUFtQztJQUN4RSxJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQTtJQUMxQixJQUFJLGVBQWUsR0FBRyxDQUFDLGVBQWU7UUFDcEMsa0JBQWtCLEdBQUcsa0JBQWtCLEdBQUcsZUFBZSxDQUFBO0lBQzNELENBQUMsQ0FBQTtJQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQ2hGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQ25GLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQ2hGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQzdFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQ2hGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFBQyxDQUFDO0lBRXRGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==