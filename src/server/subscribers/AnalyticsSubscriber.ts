import { EventSubscriber, On } from 'event-dispatch'

import { env } from '../../env'
import { Logger } from '../../lib/logger'
import { events } from './events'

const log = new Logger(__filename)

@EventSubscriber()
export class AnalyticsSubscriber {
  @On(events.access.unauthorized)
  private async onAccessUnauthorized(data: {
    success: boolean
  }): Promise<void> {
    console.dir(data)
  }

  @On(events.link.open)
  private async onLinkOpen(data: { success: boolean }): Promise<void> {
    console.dir(data)
  }
}
