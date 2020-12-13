import * as redisStore from 'connect-redis'
import * as express from 'express'
import * as session from 'express-session'
import { RedisClient } from 'redis'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Container } from 'typedi'

import { env } from '../../env'

@Middleware({ type: 'before', priority: 1100 })
export class SentryMiddleware implements ExpressMiddlewareInterface {
  private useSession: express.RequestHandler

  private redisClient: RedisClient = Container.get('redis')

  constructor() {
    const RedisStore = redisStore(session)

    const config = {
      secret: env.session.secret,
      cookie: { secure: false },
      resave: true,
      saveUninitialized: true,
      store: new RedisStore({ client: this.redisClient }),
    }

    if (env.isProduction) config.cookie.secure = true
    this.useSession = session(config)
  }

  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    let tries = 3

    const lookupSession = (error?: Error): void => {
      if (error) return next(error)

      tries -= 1
      if (req.session !== undefined) return next()
      if (tries < 0) return next(new Error('oh no'))

      return this.useSession(req, res, next)
    }

    lookupSession()
  }
}
