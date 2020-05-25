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
exports.ExtendedDate = void 0;
const plugins = __importStar(require("./smarttime.plugins"));
class ExtendedDate extends Date {
    constructor(unixMilli) {
        super(unixMilli);
    }
    // STATIC factories
    static fromMillis(milliSeconds) {
        return new ExtendedDate(milliSeconds);
    }
    static fromDate(dateArg) {
        return new ExtendedDate(dateArg.getTime());
    }
    static fromEuropeanDate(europeanDate) {
        const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDate);
        const luxonDate = plugins.luxon.DateTime.utc(parseFloat(dateArray[3]), // year
        parseFloat(dateArray[2]), // month
        parseFloat(dateArray[1]) // day
        );
        const unixMilli = luxonDate.toMillis();
        return new ExtendedDate(unixMilli);
    }
    /**
     * creates an Extended date from a hypedDate like "2018-03-28"
     * @param dateString
     */
    static fromHyphedDate(dateString) {
        // guards
        // implementation
        const dateMillis = new Date(dateString).getTime();
        return new ExtendedDate(dateMillis);
    }
    /**
     * Same as .fromEuropeanDate(), but accepts additional timeArg and zoneArg
     */
    static fromEuropeanDateAndTime(europeanDateArg, timeArg = '12:00:00', zoneArg = 'Europe/Berlin') {
        // guards
        // implementation
        const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDateArg);
        const sliceDate = (dateString) => {
            return `0${dateString}`.slice(-2);
        };
        const dateTimeString = `${dateArray[3]}-${sliceDate(dateArray[2])}-${sliceDate(dateArray[1])}T${timeArg}`;
        const luxonDate = plugins.luxon.DateTime.fromISO(dateTimeString, {
            zone: zoneArg
        });
        const unixMilli = luxonDate.toMillis();
        return new ExtendedDate(unixMilli);
    }
    //
    exportToEuropeanDate() {
        const units = this.exportToUnits();
        return `${units.dayString}.${units.monthString}.${units.yearString}`;
    }
    /**
     * exports units
     */
    exportToUnits() {
        const monthsArray = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const daysArray = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        return {
            year: this.getFullYear(),
            yearString: `${this.getFullYear()}`,
            month: this.getMonth() + 1,
            monthString: ("0" + (this.getMonth() + 1)).slice(-2),
            monthName: monthsArray[this.getMonth()],
            day: this.getDate(),
            dayString: ("0" + this.getDate()).slice(-2),
            dayOfTheWeek: this.getDay(),
            dayOfTheWeekName: daysArray[this.getDay()]
        };
    }
}
exports.ExtendedDate = ExtendedDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR0aW1lLmNsYXNzZXMuZXh0ZW5kZWRkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR0aW1lLmNsYXNzZXMuZXh0ZW5kZWRkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBK0M7QUFnQi9DLE1BQWEsWUFBYSxTQUFRLElBQUk7SUE2RHBDLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUE5REQsbUJBQW1CO0lBQ1osTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFvQjtRQUMzQyxPQUFPLElBQUksWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWE7UUFDbEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQW9CO1FBQ2pELE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQzFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPO1FBQ2pDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRO1FBQ2xDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQ2hDLENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsT0FBTyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGNB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