import { expect, tap } from 'tapbundle'
import * as smarttime from '../ts/index'


// Test TimeStamp class
let testTimeStamp: smarttime.TimeStamp
let testTimeStamp2: smarttime.TimeStamp
tap.test('should create valid testTimeStamp instance', async (tools) => {
  testTimeStamp = new smarttime.TimeStamp()
  await tools.delayFor(2)
  testTimeStamp2 = new smarttime.TimeStamp()
  expect(testTimeStamp).to.be.instanceof(smarttime.TimeStamp)
  expect(testTimeStamp).to.be.instanceof(smarttime.TimeStamp)
})

tap.test('should have valid linuxtime', async () => {
  // tslint:disable-next-line:no-unused-expression
  expect(testTimeStamp.isOlderThan(testTimeStamp2)).to.be.true
  expect(testTimeStamp.isYoungerThan(testTimeStamp2)).to.be.false
})

let testHrtMeasurement: smarttime.HrtMeasurement

// Test HrtMeasurement
tap.test('should create valid HrtMeasurements', async (tools) => {
  testHrtMeasurement = new smarttime.HrtMeasurement()
  testHrtMeasurement.start()
  await tools.delayFor(20)
  testHrtMeasurement.stop()
  expect(testHrtMeasurement.milliSeconds).to.be.greaterThan(19)
  expect(testHrtMeasurement.milliSeconds).to.be.lessThan(25)
})


tap.start()
