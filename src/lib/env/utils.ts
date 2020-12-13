import { join } from 'path'

export function getOsEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new TypeError(`Environment variable ${key} is not set.`)
  }

  return process.env[key] as string
}

export function getOsEnvOptional(key: string): string | undefined {
  return process.env[key]
}

export function getPath(path: string): string {
  return process.env.NODE_ENV === 'production'
    ? join(process.cwd(), `${path.replace('src/', 'dist/').slice(0, -3)}.js`)
    : join(process.cwd(), path)
}

export function getPaths(paths: string[]): string[] {
  return paths.map((p) => getPath(p))
}

export function getOsPath(key: string): string {
  return getPath(getOsEnv(key))
}

export function getOsPaths(key: string): string[] {
  return getPaths(getOsEnvArray(key))
}

export function getOsEnvArray(key: string, delimiter = ','): string[] {
  const envData = process.env[key]?.split(delimiter)
  return envData || []
}

export function toNumber(value: string): number {
  return Number.parseInt(value, 10)
}

export function toBool(value: string): boolean {
  return value === 'true'
}

export function normalizePort(port: string): number | boolean {
  const parsedPort = Number.parseInt(port, 10)
  if (Number.isNaN(parsedPort)) {
    // named pipe
    return false
  }
  if (parsedPort >= 0) {
    // port number
    return parsedPort
  }
  return false
}
