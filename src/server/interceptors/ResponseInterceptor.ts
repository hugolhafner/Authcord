import { Action, Interceptor, InterceptorInterface } from 'routing-controllers'

import { Logger } from '../../decorators/Logger'
import { env } from '../../env'
import { LoggerInterface } from '../../lib/logger'

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  public isProduction = env.isProduction

  constructor(@Logger(__filename) private log: LoggerInterface) {}

  // eslint-disable-next-line class-methods-use-this
  intercept(
    action: Action,
    content: unknown,
  ): { success: boolean; data: unknown } {
    const { response } = action

    // Check if the status code is a 2** or 3**, and return as success if it is, else failure.
    const statusIdentifier = response.statusCode.toString()[0]
    if (statusIdentifier === '2' || statusIdentifier === '3') {
      return {
        success: true,
        data: content,
      }
    }
    return {
      success: false,
      data: content,
    }
  }
}
