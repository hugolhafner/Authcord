import * as express from 'express'
import { Action } from 'routing-controllers'

import { Logger } from '../lib/logger'

const log = new Logger()

export function authorizationChecker(): (
  action: Action,
  roles: string[],
) => Promise<boolean> | boolean {
  /**
   * innerAuthorizationChecker
   * * Request / Response objects from action to verify that there is an auth header and that the user has access to this resources
   * @param {Action} action Controller action properties that includes request and response objects
   * @param {string[]} roles The required roles to access this resource
   * @returns {Promise.<boolean>} Promise that resolves to a boolean, which dictates whether or not to allow the request to proceed
   */
  return async function innerAuthorizationChecker(
    action: Action,
    roles: string[],
  ): Promise<boolean> {
    const req: express.Request = action.request
    const { sessionID } = req

    return !!sessionID
  }
}
