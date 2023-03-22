// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { retro } from 'next-avatar'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    throw new Error('invalid params')
  }

  const data = retro(id).toBuffer()

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable'
    })
    .end(data, 'binary')
}
