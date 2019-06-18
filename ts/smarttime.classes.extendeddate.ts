import * as plugins from './smarttime.plugins';

export type TAvailableZone = 'Europe/Berlin';

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

export class ExtendedDate extends Date {
  // STATIC factories
  public static fromMillis(milliSeconds: number) {
    return new ExtendedDate(milliSeconds);
  }

  public static fromDate(dateArg: Date) {
    return new ExtendedDate(dateArg.getTime());
  }

  public static fromEuropeanDate(europeanDate: string) {
    const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDate);
    const luxonDate = plugins.luxon.DateTime.utc(
      parseFloat(dateArray[3]), // year
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
  public static fromHyphedDate(dateString: string) {
    // guards
    // implementation
    const dateMillis = new Date(dateString).getTime();
    return new ExtendedDate(dateMillis);
  }

  /**
   * Same as .fromEuropeanDate(), but accepts additional timeArg and zoneArg
   */
  public static fromEuropeanDateAndTime(
    europeanDateArg: string,
    timeArg: string = '12:00:00',
    zoneArg: TAvailableZone = 'Europe/Berlin'
  ) {
    // guards

    // implementation
    const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDateArg);
    const sliceDate = (dateString: string) => {
      return `0${dateString}`.slice(-2);
    };
    const dateTimeString = `${dateArray[3]}-${sliceDate(dateArray[2])}-${sliceDate(
      dateArray[1]
    )}T${timeArg}`;
    const luxonDate = plugins.luxon.DateTime.fromISO(dateTimeString, {
      zone: zoneArg
    });
    const unixMilli = luxonDate.toMillis();
    return new ExtendedDate(unixMilli);
  }

  // INSTANCE
  public timezone: TAvailableZone;


  constructor(unixMilli: number) {
    super(unixMilli);
  }

  //
  public exportToEuropeanDate() {
    const units = this.exportToUnits();
    return `${units.dayString}.${units.monthString}.${units.yearString}`;
  }

  /**
   * exports units
   */
  public exportToUnits(): IDateUnits {
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
