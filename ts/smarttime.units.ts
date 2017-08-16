export let units = {
  years: (timesArg = 1): number => {
    return timesArg * 3154e+10
  },
  months: (timesArg = 1): number => {
    return timesArg * 2628e+9
  },
  weeks: (timesArg = 1) => {
    return timesArg * 6048e+8
  },
  days: (timesArg = 1) => {
    return timesArg * 864e+7
  },
  hours: (timesArg = 1) => {
    return timesArg * 36e+6
  },
  minutes: (timesArg = 1) => {
    return timesArg * 60000
  }
}

export interface IUnitCombinationArg {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
}

export let getMilliSecondsFromUnits = (combinationArg: IUnitCombinationArg) => {
  let timeInMilliseconds = 0
  let addMilliSeconds = (milliSecondsArg) => {
    timeInMilliseconds = timeInMilliseconds + milliSecondsArg
  }
  if (combinationArg.years) { addMilliSeconds(units.years(combinationArg.years)) }
  if (combinationArg.months) { addMilliSeconds(units.months(combinationArg.months)) }
  if (combinationArg.weeks) { addMilliSeconds(units.weeks(combinationArg.weeks)) }
  if (combinationArg.days) { addMilliSeconds(units.days(combinationArg.days)) }
  if (combinationArg.hours) { addMilliSeconds(units.hours(combinationArg.hours)) }
  if (combinationArg.minutes) { addMilliSeconds(units.minutes(combinationArg.minutes)) }

  return timeInMilliseconds
}

