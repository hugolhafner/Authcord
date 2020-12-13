import 'reflect-metadata'

import { bootstrapMicroframework } from 'microframework-w3tec'

import { Logger } from './lib/logger'
import { eventDispatchLoader } from './loaders/eventDispatchLoader'
import { expressLoader } from './loaders/expressLoader'
import { iocLoader } from './loaders/iocLoader'
import { redisLoader } from './loaders/redisLoader'
import { sentryLoader } from './loaders/sentryLoader'
import { winstonLoader } from './loaders/winstonLoader'

const log = new Logger(__filename)

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    sentryLoader,
    winstonLoader,
    iocLoader,
    redisLoader,
    eventDispatchLoader,
    expressLoader,
  ],
})
  .then(() => log.info('Successfully started the application'))
  .catch((error) => {
    log.error(`Application crashed: ${error}`)
    log.debug(error.stack)
  })
