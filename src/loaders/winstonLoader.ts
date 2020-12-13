import { MicroframeworkLoader } from 'microframework-w3tec'
import { configure, format, transports } from 'winston'

import { env } from '../env'

/**
 * winstonLoader
 * * Sets up the winston logger for later use in the project and adds the required transports
 */
export const winstonLoader: MicroframeworkLoader = () => {
  configure({
    transports: [
      new transports.Console({
        level: env.log.level,
        handleExceptions: true,
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  })
}
