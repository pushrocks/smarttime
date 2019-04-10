import { tap, expect } from '@pushrocks/tapbundle';

import * as smarttime from '../ts/index';

let testCronManager: smarttime.CronManager;

tap.test('should create a valid instance of cronmanager', async () => {
  testCronManager = new smarttime.CronManager();
});

tap.start();
