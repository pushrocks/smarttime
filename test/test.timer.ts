// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';

import { Timer } from '../ts/index';

let testTimer: Timer;

tap.test('should create a valid timer', async () => {
  testTimer = new Timer(1000);
  expect(testTimer).to.be.instanceof(Timer);
});

tap.test('should start timer', async () => {
  testTimer.start();
  await testTimer.completed;
});

tap.test('should reset a timer', async () => {
  testTimer.reset();
  testTimer.start();
  testTimer.reset();
  testTimer.start();
  await testTimer.completed;
});

tap.start();
