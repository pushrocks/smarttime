// @pushrocks scope
import * as lik from '@pushrocks/lik';
import * as smartdelay from '@pushrocks/smartdelay';
import * as smartpromise from '@pushrocks/smartpromise';

export { lik, smartdelay, smartpromise };

// third parties
import croner from 'croner';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export { croner, dayjs };
