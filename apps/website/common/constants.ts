import { get } from 'lodash'

const { env } = process
const logflareAPIKey = fromEnv('LOGFLARE_API_KEY', null)
const logflareToken = fromEnv('LOGFLARE_API_TOKEN', null)

export const systemConstants = {
  name: 'retro-avatar',
  repo: 'https://github.com/youking-lib/retro-avatar',
  site: {
    title: 'Retro Avatar',
    description:
      'Create indenticon-like visual hashes styled like Github and Gravatar (retro) avatars'
  },
  ga: fromEnv<string>('GA_TRACKING_ID', null),
  logflare: logflareAPIKey
    ? { APIKey: logflareAPIKey, token: logflareToken }
    : null
}

function fromEnv<T>(key: string, defaultValue?: T) {
  return get(env, key, defaultValue)
}
