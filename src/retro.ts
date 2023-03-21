import { Canvas } from 'canvas'
import lodash from 'lodash'
import { hash } from './hash'
import { reflect } from './utils'

const { isNull, isNumber, isString } = lodash

type RetroOptions = {
  bgColor?: string | null
  imagePadding?: number
  maxFill?: number
  minFill?: number
  pixelColor?: number
  pixelPadding?: number
  pixelSize?: number
  tiles?: number
}

const defaultRetroOptions: RetroOptions = {
  bgColor: null,
  imagePadding: 0,
  maxFill: 0.9,
  minFill: 0.3,
  pixelColor: 0,
  pixelPadding: 0,
  pixelSize: 10,
  tiles: 5
}

export function retro(id: string, options?: RetroOptions) {
  const {
    tiles,
    pixelSize,
    pixelPadding,
    bgColor,
    minFill,
    maxFill,
    pixelColor,
    imagePadding
  } = {
    ...defaultRetroOptions,
    ...options
  } as Required<RetroOptions>

  const mid = Math.ceil(tiles / 2)
  const hashed = hash(id, mid * tiles, minFill, maxFill)
  const pic = reflect(hashed.pixels, tiles)

  const csize = pixelSize * tiles + imagePadding * 2
  const canvas = new Canvas(csize, csize)
  const ctx = canvas.getContext('2d')

  if (isString(bgColor)) {
    ctx.fillStyle = bgColor
  } else if (isNumber(bgColor)) {
    ctx.fillStyle = '#' + hashed.colors[bgColor]
  }

  if (!isNull(bgColor)) ctx.fillRect(0, 0, csize, csize)

  var drawOp = ctx.fillRect.bind(ctx)

  if (isString(pixelColor)) {
    ctx.fillStyle = pixelColor
  } else if (isNumber(pixelColor)) {
    ctx.fillStyle = '#' + hashed.colors[pixelColor]
  } else {
    drawOp = ctx.clearRect.bind(ctx)
  }

  for (var x = 0; x < tiles; x++)
    for (var y = 0; y < tiles; y++)
      if (pic[y][x])
        drawOp(
          x * pixelSize + pixelPadding + imagePadding,
          y * pixelSize + pixelPadding + imagePadding,
          pixelSize - pixelPadding * 2,
          pixelSize - pixelPadding * 2
        )

  return canvas
}
