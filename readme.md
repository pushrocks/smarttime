# @pushrocks/smarttime
handle time in smart ways

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smarttime)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smarttime)
* [github.com (source mirror)](https://github.com/pushrocks/smarttime)
* [docs (typedoc)](https://pushrocks.gitlab.io/smarttime/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smarttime/badges/master/build.svg)](https://gitlab.com/pushrocks/smarttime/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smarttime/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smarttime/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smarttime.svg)](https://www.npmjs.com/package/@pushrocks/smarttime)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smarttime/badge.svg)](https://snyk.io/test/npm/@pushrocks/smarttime)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

Smarttime offers smart ways to deal with time.

### class CronManager
This class provides scheduling of functions with a cron syntax

```typescript
import { CronManager } from '@pushrocks/smarrtime';
const cronManagerInstance = new CronManager();
cronManagerInstance.addConrjob('* * * * * *', async () => {
  console.log('hello'); // will log 'hello' to console once every second;
})
cronManagerInstance.start();
```

### class ExtendedDate
This class offers static functions to create zone specific JavaScript dates from European formated time strings.

```TypeScript
import { ExtendedDate } from '@pushrocks/smarttime'
const myDate: Date = ExtendedDate.fromEuropeanDate('8.6.2018')
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
