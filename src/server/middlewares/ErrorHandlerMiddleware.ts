import * as Sentry from '@sentry/node'
import * as express from 'express'
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

import { Logger, LoggerInterface } from '../../decorators/Logger'
import { env } from '../../env'
import { ErrorInterface } from '../../types'

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = env.isProduction

  constructor(@Logger('middleware:error') private log: LoggerInterface) {}

  public async error<T extends ErrorInterface>(
    error: T,
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // Only return the error to the user if its a 4** error (e.g 400, 403, 404)

    if (error.httpCode && error.httpCode < 500) {
      res.status(error.httpCode)
      res.json({
        success: false,
        status: res.statusCode,
        name: error.name,
        message: error.message,
        errors: error.errors || [],
      })
    } else {
      res.status(500)
      res.json({
        success: false,
        status: res.statusCode,
        name: error.name,
        message:
          'Internal Server Error when trying to handle your request. Please retry at a later date or contact support.',
      })

      // Log the error to sentry if its an actual request error and not just a client making a mistake -
      Sentry.Handlers.errorHandler()(error, req, res, (err) => {
        this.log.error(`${err.name}: ${err.message}`)
      })
    }

    this.log.error(`${error.name}: ${error.message}`)
    this.log.debug(error.stack)
  }
}
