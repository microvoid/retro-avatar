import lodash from 'lodash'
import { cmp_brightness, sha512, unpack, xor } from './utils'

export function hash(str: string, n, minFill, maxFill) {
  const buf = Buffer.alloc(str.length + 1)

  buf.write(str)

  for (let i = 0; i < 0x100; i++) {
    buf[buf.length - 1] = i

    const fbuf = gen(buf, Math.ceil(n / 8) + 6)
    const pixels = lodash<Buffer>(slice(fbuf, 6))
      .map(function (x) {
        return unpack(x)
      })
      .flatten()
      .take(n)

    const setPixels = pixels.filter(lodash.identity).size()
    const c = [slice(fbuf, 0, 3), slice(fbuf, 3, 6)]

    c.sort(cmp_brightness)

    if (setPixels > minFill * n && setPixels < maxFill * n) {
      return {
        colors: c.map<string>(function (x) {
          return x.toString('hex')
        }),
        pixels: pixels.value() as boolean[]
      }
    }
  }

  throw new Error(`String '''${str}''' unhashable in single-byte search space.`)
}

function slice(buf: Buffer, start?: number, end?: number) {
  return Uint8Array.prototype.slice.call(buf, start, end)
}

function gen(buf: Buffer, len: number) {
  if (len > 64) {
    throw new Error(
      'sha512 can only generate 64B of data: ' + len + 'B requested'
    )
  }

  return lodash(sha512(buf))
    .groupBy(function (x: any, k: number) {
      return Math.floor(k / len)
    })
    .reduce(xor)
}
