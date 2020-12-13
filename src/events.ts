export const metrics = {
  express: {
    route: 'express.route',
  },
}

/**
 * eventsToSet()
 * * Turns the events dictionary into a 1D Set of event strings
 * @param {Record.<string, unknown>} _events the events dictionary to convert into
 * @returns {Set<string>} 1D set of event strings
 */
export const eventsToSet = (_events: Record<string, unknown>): Set<string> => {
  const rawEvents = Object.values(
    _events,
  ).map((value: Record<string, string>) => Object.values(value))

  return new Set(...rawEvents)
}
