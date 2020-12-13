import * as compression from 'compression'
import * as express from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before', priority: 700 })
export class CompressionMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    return compression()(req, res, next)
  }
}
