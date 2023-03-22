// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { isString, includes } from 'lodash'
import { retro, theme as RetroTheme } from 'next-avatar'
import { logger } from '@/common'

type Data = {
  name: string
}

type Theme = keyof typeof RetroTheme

const themeKeys = Object.keys(RetroTheme) as Theme[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, t = 'github' } = req.query

  logger.api.info('handle api')

  if (!isString(id)) {
    res.status(404).end()
    return
  }

  let theme = RetroTheme.github

  if (includes(themeKeys, t)) {
    theme = RetroTheme[t as Theme]
  }

  const startTS = performance.now()
  const data = retro(id, theme).toBuffer()
  const endTS = performance.now()

  logger.api.info(`retro cause(${id}): ${Math.floor(endTS - startTS)}ms`)

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable'
    })
    .end(data, 'binary')
}
