import pino, { LoggerOptions } from 'pino'
import { createWriteStream } from 'pino-logflare'
import { systemConstants } from './constants'

let stream: any = undefined

if (systemConstants.logflare) {
  stream = createWriteStream({
    apiKey: systemConstants.logflare.APIKey,
    sourceToken: systemConstants.logflare.token!
  })
}

export function createLogger(options: LoggerOptions) {
  const transport = stream
    ? undefined
    : {
        target: 'pino-pretty'
      }

  return pino(
    {
      level: 'debug',
      transport,
      ...options
    },
    stream
  )
}

// create pino logger
export const logger = {
  create: createLogger,

  system: createLogger({
    name: 'system'
  }),

  http: createLogger({
    name: 'http'
  }),

  api: createLogger({
    name: 'api'
  })
}
