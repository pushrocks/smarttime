import * as plugins from './smarttime.plugins';

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

  constructor(unixMilli: number) {
    super(unixMilli);
  }
}
