import { Action } from 'routing-controllers'

export function currentUserChecker(): (
  action: Action,
) => Promise<Record<string, unknown> | undefined> {
  return async function innerCurrentUserChecker(
    action: Action,
  ): Promise<Record<string, unknown> | undefined> {
    return action.request?.session?.user
  }
}
