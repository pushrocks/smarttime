export declare let units: {
    years: (timesArg?: number) => number;
    months: (timesArg?: number) => number;
    weeks: (timesArg?: number) => number;
    days: (timesArg?: number) => number;
    hours: (timesArg?: number) => number;
    minutes: (timesArg?: number) => number;
};
export interface IUnitCombinationArg {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
}
export declare let getMilliSecondsFromUnits: (combinationArg: IUnitCombinationArg) => number;
