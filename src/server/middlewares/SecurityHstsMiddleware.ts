import * as express from 'express'
import * as helmet from 'helmet'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before', priority: 1000 })
export class SecurityHstsMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public use(req: express.Request, res: express.Response, next: express.NextFunction): void {
    return helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true
    })(req, res, next)
  }
}
