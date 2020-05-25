export declare type TAvailableZone = 'Europe/Berlin';
export interface IDateUnits {
    year: number;
    yearString: string;
    month: number;
    monthString: string;
    monthName: string;
    day: number;
    dayString: string;
    dayOfTheWeek: number;
    dayOfTheWeekName: string;
}
export declare class ExtendedDate extends Date {
    static fromMillis(milliSeconds: number): ExtendedDate;
    static fromDate(dateArg: Date): ExtendedDate;
    static fromEuropeanDate(europeanDate: string): ExtendedDate;
    /**
     * creates an Extended date from a hypedDate like "2018-03-28"
     * @param dateString
     */
    static fromHyphedDate(dateString: string): ExtendedDate;
    /**
     * Same as .fromEuropeanDate(), but accepts additional timeArg and zoneArg
     */
    static fromEuropeanDateAndTime(europeanDateArg: string, timeArg?: string, zoneArg?: TAvailableZone): ExtendedDate;
    timezone: TAvailableZone;
    constructor(unixMilli: number);
    exportToEuropeanDate(): string;
    /**
     * exports units
     */
    exportToUnits(): IDateUnits;
}
