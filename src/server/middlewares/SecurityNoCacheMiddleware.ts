import * as express from 'express'
import * as noCache from 'nocache'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before', priority: 800 })
export class SecurityNoCacheMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public use(req: express.Request, res: express.Response, next: express.NextFunction): void {
    return noCache()(req, res, next)
  }
}
