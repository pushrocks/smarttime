import * as plugins from './smarttime.plugins';

export type TAvailableZone = 'Europe/Berlin';

export class ExtendedDate extends Date {
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

  /** */
  public static fromEuropeanDateAndTime(
    europeanDateArg: string,
    timeArg: string,
    zoneArg: TAvailableZone
  ) {
    const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDateArg);
    const sliceDate = (dateString: string) => {
      return `0${dateString}`.slice(-2);
    };
    const dateTimeString = `${dateArray[3]}-${sliceDate(dateArray[2])}-${sliceDate(dateArray[1])}T${timeArg}`;
    const luxonDate = plugins.luxon.DateTime.fromISO(
      dateTimeString,
      {
        zone: zoneArg
      }
    );
    const unixMilli = luxonDate.toMillis();
    return new ExtendedDate(unixMilli);
  }

  constructor(unixMilli: number) {
    super(unixMilli);
  }
}
