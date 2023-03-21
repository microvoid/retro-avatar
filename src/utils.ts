import crypto from 'crypto'

export function xor(a: Buffer, b: Buffer) {
  const n = Math.min(a.length, b.length)
  const m = Math.max(a.length, b.length)
  const out = Buffer.alloc(m)
  const longer = a.length > b.length ? a : b

  for (let i = 0; i < n; i++) out[i] = a[i] ^ b[i]

  for (let i = n; i < m; i++) out[i] = longer[i]

  return out
}

export function reflect(pixels: boolean[], dimension: number) {
  const mid = Math.ceil(dimension / 2)
  const odd = Boolean(dimension % 2)
  const pic = []

  for (let row = 0; row < dimension; row++) {
    pic[row] = []
    for (let col = 0; col < dimension; col++) {
      let p = row * mid + col
      if (col >= mid) {
        const d = mid - (odd ? 1 : 0) - col
        const ad = Math.abs(d)
        p = row * mid + mid - 1 - ad
      }
      pic[row][col] = pixels[p]
    }
  }

  return pic
}

export function unpack(nMask) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
  for (var i = 0, nShifted = nMask, a = []; i < 8; nShifted >>>= 1, i++)
    a.push(Boolean(nShifted & 1))
  return a
}

export function brightness(r: number, g: number, b: number) {
  // http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
  return Math.sqrt(0.241 * r * r + 0.691 * g * g + 0.068 * b * b)
}

export function cmp_brightness(a: Buffer, b: Buffer) {
  return brightness(a[0], a[1], a[2]) - brightness(b[0], b[1], b[2])
}

export function rcmp_brightness(a: Buffer, b: Buffer) {
  return cmp_brightness(b, a)
}

export function sha512(data: crypto.BinaryLike) {
  return crypto.createHash('sha512').update(data).digest()
}
