import * as Sentry from '@sentry/node'
import { MicroframeworkLoader } from 'microframework-w3tec'

import { env } from '../env'

export const sentryLoader: MicroframeworkLoader = () => {
  Sentry.init({
    dsn: env.log.sentryDsn,
    release: `(${env.node})${env.app.name}@${env.app.version}`,
  })
}
