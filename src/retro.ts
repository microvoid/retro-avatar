import { Canvas } from 'canvas'
import lodash from 'lodash'
import { hash } from './hash'
import { reflect } from './utils'
import { theme, RetroTheme } from './theme'

const { isNull, isNumber, isString } = lodash

const defaultRetroOptions: RetroTheme = {
  pixelSize: 10,
  bgColor: null,
  pixelPadding: 0,
  imagePadding: 0,
  tiles: 5,
  minFill: 0.3,
  maxFill: 0.9,
  pixelColor: 0
}

export function retro(id: string, options = theme.github) {
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
    ...theme.github,
    ...options
  } as Required<RetroTheme>

  const mid = Math.ceil(tiles / 2)
  const { colors, pixels } = hash(id, mid * tiles, minFill, maxFill)
  const pic = reflect(pixels, tiles)

  const csize = pixelSize * tiles + imagePadding * 2
  const canvas = new Canvas(csize, csize)
  const ctx = canvas.getContext('2d')

  if (isString(bgColor)) {
    ctx.fillStyle = bgColor
  } else if (isNumber(bgColor)) {
    ctx.fillStyle = '#' + colors[bgColor]
  }

  if (!isNull(bgColor)) ctx.fillRect(0, 0, csize, csize)

  var drawOp = ctx.fillRect.bind(ctx)

  if (isString(pixelColor)) {
    ctx.fillStyle = pixelColor
  } else if (isNumber(pixelColor)) {
    ctx.fillStyle = '#' + colors[pixelColor]
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
