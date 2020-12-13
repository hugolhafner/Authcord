import * as path from 'path'

import * as dotenv from 'dotenv'

import {
  getOsEnv,
  getOsEnvOptional,
  getPaths,
  normalizePort,
  toNumber,
} from './lib/env'

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
  ),
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json')

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  app: {
    name: pkg.name,
    version: pkg.version,
    port: normalizePort(
      getOsEnvOptional('PORT') || getOsEnvOptional('APP_PORT') || '3000',
    ),
  },
  redis: {
    url: getOsEnv('REDIS_URL'),
  },
  session: {
    secret: getOsEnv('SESSION_SECRET'),
  },
  dirs: {
    controllers: getPaths(
      'dist/server/controllers/**/*Controller.js'.split(','),
    ),
    middlewares: getPaths(
      'dist/server/middlewares/**/*Middleware.js'.split(','),
    ),
    interceptors: getPaths(
      'dist/server/interceptors/**/*Interceptor.js'.split(','),
    ),
    subscribers: getPaths(
      'dist/server/subscribers/**/*Subscriber.js'.split(','),
    ),
  },
  log: {
    level: getOsEnvOptional('LOG_LEVEL') || 'info',
    morganFormat: getOsEnvOptional('LOG_MORGAN_FORMAT') || 'dev',
    sentryDsn: getOsEnvOptional('SENTRY_DSN'),
  },
}
