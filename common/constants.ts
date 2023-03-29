import { resolve } from 'path'

const logflareAPIKey = process.env.LOGFLARE_API_KEY || null
const logflareToken = process.env.LOGFLARE_API_TOKEN || null

const CACHE_LOWDB_PATH = resolve(process.cwd(), 'cache_lowdb.json')

export const systemConstants = {
  name: 'retro-avatar',
  repo: 'https://github.com/microvoid/retro-avatar',
  site: {
    title: 'Retro Avatar',
    description:
      'Create indenticon-like visual hashes styled like Github and Gravatar (retro) avatars'
  },
  CACHE_LOWDB_PATH,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || null,
  logflare: logflareAPIKey
    ? { APIKey: logflareAPIKey, token: logflareToken }
    : null
}
