import { tap, expect } from '@pushrocks/tapbundle';

import * as smarttime from '../ts/index';

let testCronManager: smarttime.CronManager;

tap.test('should create a valid instance of cronmanager', async () => {
  testCronManager = new smarttime.CronManager();
  expect(testCronManager).to.be.instanceOf(smarttime.CronManager);
});

tap.test('should create a valid cronJon', async (tools) => {
  const done = tools.defer();
  const done2 = tools.defer();
  const done3 = tools.defer();
  let counter = 0;
  let counter2 = 0;
  let counter3 = 0;
  const cronJob = testCronManager.addCronjob('*/2 * * * * *', async () => {
    if (counter === 10) {
      testCronManager.removeCronjob(cronJob);
      done.resolve();
    }
    counter++;
    console.log(`${new Date().getSeconds()} hey ${counter} -> runs every 2 seconds`);
  });
  const cronJob2 = testCronManager.addCronjob('*/3 * * * * *', async () => {
    if (counter2 === 10) {
      testCronManager.removeCronjob(cronJob2);
      done2.resolve();
    }
    counter2++;
    console.log(`${new Date().getSeconds()} hey ${counter2} -> runs every 3 seconds`);
  });
  const cronJob3 = testCronManager.addCronjob('*/4 * * * * *', async () => {
    if (counter3 === 10) {
      done3.resolve();
    }
    counter3++;
    console.log(`${new Date().getSeconds()} hey ${counter3} -> runs every 4 seconds`);
  });
  testCronManager.start();
  await done.promise;
  await done2.promise;
  await done3.promise;
  testCronManager.stop();
  testCronManager.removeCronjob(cronJob3);
});

tap.test('runs every full minute', async (tools) => {
  const done = tools.defer();
  const cronJob = testCronManager.addCronjob('0 * * * * *', async () => {
    done.resolve();
  });
  testCronManager.start();
  await done.promise;
  testCronManager.stop();
});

tap.start();
