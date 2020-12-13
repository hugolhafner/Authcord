import * as express from 'express'
import * as helmet from 'helmet'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before', priority: 900 })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public use(req: express.Request, res: express.Response, next: express.NextFunction): void {
    return helmet()(req, res, next)
  }
}
