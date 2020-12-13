import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec'
import * as redis from 'redis'
import { Container } from 'typedi'

import { env } from '../env'
import { Logger } from '../lib/logger'

/**
 * redisLoader
 * * Redis Loader to connect to Redis db
 */
export const redisLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const log = new Logger('redis')

  return new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: env.redis.url,
      retry_strategy: (options) => {
        // End reconnecting after a total of 3 minutes retrying
        if (options.total_retry_time > 1000 * 60 * 3) {
          return reject(new Error('Retry time exhausted'))
        }

        // End reconnecting after 10 retry attempts
        if (options.attempt > 10) {
          return reject(new Error('Retry attempts exceeded 10'))
        }

        // Reconnect after a max of 3 seconds
        return Math.min(options.attempt * 100, 3000)
      },
    })

    client.on('ready', () => {
      log.debug('Successfully established connection to redis.')
      Container.set('redis', client)
      resolve()
    })

    client.on('reconnecting', () => {
      log.error('Lost connection to redis. Reconnecting...')
    })

    client.on('error', (err) => {
      log.error(err.message)
      log.debug(err.stack)
    })

    client.on('warning', (msg) => {
      log.warn(`Redis warning: ${msg}`)
    })

    if (settings) settings.onShutdown(async () => client.quit())
  })
}
