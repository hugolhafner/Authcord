export interface ErrorInterface extends Error {
  httpCode: number
  errors?: unknown[]
}
