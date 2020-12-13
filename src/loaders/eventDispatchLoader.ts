import * as glob from 'glob'
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec'

import { env } from '../env'

/**
 * eventLoader
 * * Loads all created subscribers and publishers automatically into the project so that we don't have to manually
 * @param {MicroframeworkSettings | undefined} settings passed along from previous loaders
 */
export const eventDispatchLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
) => {
  if (settings) {
    const patterns = env.dirs.subscribers
    patterns.forEach((pattern) => {
      glob(pattern, <T extends Error>(err: T, files: string[]) => {
        for (let i = 0; i < files.length; i++) {
          // eslint-disable-next-line import/no-dynamic-require, global-require
          files.forEach((file) => require(file))
        }
      })
    })
  }
}
