// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
import * as smarttime from '../ts/index';

// Test TimeStamp class
let testTimeStamp: smarttime.TimeStamp;
let testTimeStamp2: smarttime.TimeStamp;
tap.test('should create valid testTimeStamp instance', async (tools) => {
  testTimeStamp = new smarttime.TimeStamp();
  await tools.delayFor(2);
  testTimeStamp2 = new smarttime.TimeStamp();
  expect(testTimeStamp).to.be.instanceof(smarttime.TimeStamp);
  expect(testTimeStamp).to.be.instanceof(smarttime.TimeStamp);
});

tap.test('should have valid linuxtime', async () => {
  // tslint:disable-next-line:no-unused-expression
  expect(testTimeStamp.isOlderThan(testTimeStamp2)).to.be.true;
  // tslint:disable-next-line:no-unused-expression
  expect(testTimeStamp.isYoungerThanOtherTimeStamp(testTimeStamp2)).to.be.false;
});

let testHrtMeasurement: smarttime.HrtMeasurement;

// Test HrtMeasurement
tap.test('should create valid HrtMeasurements', async (tools) => {
  testHrtMeasurement = new smarttime.HrtMeasurement();
  testHrtMeasurement.start();
  await tools.delayFor(20);
  testHrtMeasurement.stop();
  expect(testHrtMeasurement.milliSeconds).to.be.greaterThan(19);
  expect(testHrtMeasurement.milliSeconds).to.be.lessThan(25);
});

// check units
tap.test('should combine units', async () => {
  const computedTime = smarttime.getMilliSecondsFromUnits({
    years: 2,
    // tslint:disable-next-line:object-literal-sort-keys
    months: 2,
    weeks: 2,
    days: 2,
    hours: 2,
    minutes: 2,
  });
  // tslint:disable-next-line:no-console
  console.log(computedTime);
});

tap.start();
