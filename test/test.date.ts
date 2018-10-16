import { expect, tap } from '@pushrocks/tapbundle';

import * as smarttime from '../ts/index';

tap.test('should create a valid JavaScript Date from European TimeStamp', async () => {
  const extendedDate = smarttime.ExtendedDate.fromEuropeanDate('10.10.2018');
  console.log(extendedDate);
});

tap.start();
