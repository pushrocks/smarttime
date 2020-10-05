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

tap.test('should create a European date string', async () => {
  const extendedDate = smarttime.ExtendedDate.fromHyphedDate('2018-02-13');
  expect(extendedDate.exportToEuropeanDate()).to.equal('13.02.2018');
});

tap.test('should format a date', async () => {
  const extendedDate = new smarttime.ExtendedDate(Date.now());
  console.log(extendedDate.format('YYYY-MM-DD - hh:mm'));
})

tap.start();
