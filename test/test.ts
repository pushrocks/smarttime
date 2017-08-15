import { expect, tap } from 'tapbundle'
import * as smarttime from '../ts/index'

tap.test('first test', async () => {
  console.log(smarttime.standardExport)
})

tap.start()
