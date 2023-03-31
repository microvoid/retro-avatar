// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { isString, includes } from 'lodash'
import { retro, theme as RetroTheme } from 'retro-avatar'
import { logger } from '@common'
import { avatarService } from '@services'

type Data = {
  name: string
}

type Theme = keyof typeof RetroTheme

const themeKeys = Object.keys(RetroTheme) as Theme[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, t = 'github', s } = req.query

  logger.api.info('handle api')

  if (!isString(id)) {
    res.status(404).end()
    return
  }

  const size = Number(s) || 256

  if (size < 16 || size > 2048) {
    res.status(404).end()
    return
  }

  avatarService.record({
    id,
    url: req.url,
    theme: (req.query.t as string) || null,
    refer: req.headers.referer,
    size: Number(s) || null
  })

  let theme = RetroTheme.github

  if (includes(themeKeys, t)) {
    theme = RetroTheme[t as Theme]
  }

  const startTS = performance.now()
  const data = retro(id, {
    theme,
    size
  })
  const endTS = performance.now()
  const buffer = data.toBuffer()

  logger.api.info(
    `[retro(${id})] bufsize: ${buffer.length}; timespent: ${Math.floor(
      endTS - startTS
    )}ms`
  )

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable'
    })
    .end(buffer, 'binary')
}
