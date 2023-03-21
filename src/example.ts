import http from 'http'
import { retro } from './retro'

http
  .createServer(async (req, res) => {
    const avatar = retro(`${Math.random()}@microvoid.io`)

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(`<img src="${avatar.toDataURL()}" />`)
  })

  .listen('8080')
