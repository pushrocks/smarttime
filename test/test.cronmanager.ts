import { tap, expect } from '@pushrocks/tapbundle';

import * as smarttime from '../ts/index';

let testCronManager: smarttime.CronManager;

tap.test('should create a valid instance of cronmanager', async () => {
  testCronManager = new smarttime.CronManager();
  expect(testCronManager).to.be.instanceOf(smarttime.CronManager);
});

tap.test('should create a valid cronJon', async tools => {
  const done = tools.defer();
  let counter = 0;
  testCronManager.addCronjob('* * * * * *', () => {
    if (counter === 10) {
      done.resolve();
    }
    counter++;
    console.log(`hey ${counter}`);
  });
  testCronManager.start();
  await done.promise;
  testCronManager.stop();
});

tap.start();
