import { expect, tap } from '@pushrocks/tapbundle';

import * as smarttime from '../ts/index';

tap.test('should create a valid JavaScript Date from European TimeStamp', async () => {
  const extendedDate = smarttime.ExtendedDate.fromEuropeanDate('1.6.2018');
  console.log(extendedDate);
});

tap.test('should create a date and time with European Format', async () => {
  const extendedDate = smarttime.ExtendedDate.fromEuropeanDateAndTime(
    '9.8.2018',
    '08:00:00',
    'Europe/Berlin'
  );
  console.log(extendedDate);
});

tap.start();
