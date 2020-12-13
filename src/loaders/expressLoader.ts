import { Application } from 'express'
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec'
import { createExpressServer } from 'routing-controllers'
import Container from 'typedi'

import { authorizationChecker } from '../auth/authorizationChecker'
import { currentUserChecker } from '../auth/currentUserChecker'
import { env } from '../env'
import { Logger } from '../lib/logger'

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
) => {
  const log = new Logger('express')

  if (settings) {
    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const expressApp: Application = createExpressServer({
      classTransformer: true,
      validation: true,
      defaultErrorHandler: false,

      /**
       * We can add options about how routing-controllers should configure itself.
       * Here we specify what controllers should be registered in our express server.
       */
      controllers: env.dirs.controllers,
      middlewares: env.dirs.middlewares,
      interceptors: env.dirs.interceptors,

      /**
       * Authorization features
       */
      authorizationChecker: authorizationChecker(),
      currentUserChecker: currentUserChecker(),
    })

    // Have it use the X-Forwarded-For header for IP
    expressApp.set('trust proxy', true)

    // Run application to listen on given port
    if (!env.isTest) {
      const server = expressApp.listen(env.app.port)
      Container.set('expressServer', server)
      settings.setData('express_server', server)

      settings.onShutdown(() =>
        server.close((err: Error) => {
          if (err) {
            log.error(err.toString())
            log.debug(err.stack)
          } else log.debug(`Successfully shut down express server`)
        }),
      )
    }

    // Here we can set the data for other loaders
    Container.set('expressApp', expressApp)
  }
}
