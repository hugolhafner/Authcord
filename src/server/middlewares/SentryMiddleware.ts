import * as Sentry from '@sentry/node'
import * as express from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before', priority: 1100 })
export class SentryMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public use(req: express.Request, res: express.Response, next: express.NextFunction): void {
    return Sentry.Handlers.requestHandler({
      user: ['id', 'userName', 'isAdmin', 'scopes'] // TODO: Change this Data
    })(req, res, next)
  }
}
