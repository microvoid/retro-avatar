import { get } from 'lodash'

const { env } = process
const logflareAPIKey = fromEnv('LOGFLARE_API_KEY', null)
const logflareToken = fromEnv('LOGFLARE_API_TOKEN', null)

export const systemConstants = {
  logflare: logflareAPIKey
    ? { APIKey: logflareAPIKey, token: logflareToken }
    : null
}

function fromEnv<T>(key: string, defaultValue?: T) {
  return get(env, key, defaultValue)
}
