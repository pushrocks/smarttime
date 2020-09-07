import * as plugins from './smarttime.plugins';

export class CronParser {
  public cronExpression: string;
  public get cronArray() {
    return this.cronExpression.split(' ');
  }
  constructor(cronExpressionArg: string) {
    this.cronExpression = cronExpressionArg;
    if (this.cronArray.length < 6) {
      throw new Error('CronParser needs second level accuracy');
    }
  }

  private getNextPartMatch(cronPart: string, startValue: number, moduloArg: number) {
    if (cronPart === '*') {
      return startValue;
    }
    if (cronPart.includes('/')) {
      const every = parseInt(cronPart.split('/')[1], 10);
      const findEvenMatch = (recursionStartArg: number) => {
        if (recursionStartArg % every === 0) {
          return recursionStartArg;
        } else {
          return findEvenMatch(recursionStartArg + 1);
        }
      };
      return findEvenMatch(startValue);
    }
    if (parseInt(cronPart, 10) || cronPart === '0') {
      const match = parseInt(cronPart, 10);
      return match;
    }
  }

  public msToNext() {
    const cronArray = this.cronArray;
    const secondExpression = cronArray[0];
    const minuteExpression = cronArray[1];
    const hourExpression = cronArray[2];
    const dayExpression = cronArray[3];
    const monthExpression = cronArray[4];
    const yearExpression = cronArray[5];

    let currentDate = new Date();
    let currentSecond = currentDate.getSeconds() + 1;
    let currentMinute = currentDate.getMinutes();
    let currentHour = currentDate.getHours();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const targetSecond = this.getNextPartMatch(secondExpression, currentSecond, 59);
    if (targetSecond < currentSecond) {
      currentMinute = (currentMinute + 1) % 59;
    }
    const targetMinute = this.getNextPartMatch(minuteExpression, currentMinute, 59);
    if (targetMinute < currentMinute) {
      currentHour = (currentHour + 1) % 23;
    }
    const targetHour = this.getNextPartMatch(hourExpression, currentHour, 23);
    if (targetHour < currentHour) {
      currentDay = (currentDay + 1) % 30;
    }
    
    const targetDay = currentDay;
    if (targetDay < currentDay) {
      currentMonth = (currentMonth + 1) % 11;
    }

    const targetMonth = currentMonth;
    if (targetMonth < currentMonth) {
      currentYear = (currentYear + 1);
    }
    const targetYear = currentYear;

    const targetDate = new Date(
      targetYear,
      targetMonth,
      targetDay,
      targetHour,
      targetMinute,
      targetSecond
    );
    const targetTime = targetDate.getTime();
    return targetTime - Date.now();
  }
}
