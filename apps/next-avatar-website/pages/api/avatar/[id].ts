// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { retro } from 'next-avatar'
import { logger } from '@/common'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  logger.api.info('handle api')

  if (typeof id !== 'string') {
    res.status(404).end()
    return
  }

  const startTS = performance.now()
  const data = retro(id).toBuffer()
  const endTS = performance.now()

  logger.api.info(`retro cause: ${Math.floor(endTS - startTS)}ms`)

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable'
    })
    .end(data, 'binary')
}
